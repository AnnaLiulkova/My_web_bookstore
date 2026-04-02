const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const assetsPath = path.join(__dirname, '../client/public/assets/books'); 

if (!fs.existsSync(assetsPath)) {
    fs.mkdirSync(assetsPath, { recursive: true });
}

app.use('/assets', express.static(path.join(__dirname, '../client/public/assets')));

const getImageUrl = (filename) => {
    if (!filename) return null;
    if (filename.startsWith('http')) return filename;
    return `/assets/books/${filename}`; 
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, assetsPath) 
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname)); 
    }
})
  
const upload = multer({ storage: storage });

const authUser = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) return res.json({ success: false, message: "Not Authorized" });
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET || "secret_key");
        if (!req.body) req.body = {}; 
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

app.post('/api/upload', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }
        res.json({ 
            success: true, 
            imageUrl: getImageUrl(req.file.filename), 
            filename: req.file.filename 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Upload failed" });
    }
});

app.post('/api/books/add', async (req, res) => {
    try {
        const { name, description, price, offerPrice, category, popular, image } = req.body;
        let catEntry = await prisma.category.findUnique({ where: { name: category } });
        if (!catEntry) {
            catEntry = await prisma.category.findFirst() || await prisma.category.create({data: {name: category, imageUrl: ""}});
        }

        const newBook = await prisma.book.create({
            data: {
                name,
                description,
                price: Number(price),
                offerPrice: Number(offerPrice),
                popular,
                categoryId: catEntry.id,
                images: {
                    create: { imageUrl: image } 
                }
            }
        });
        res.json({ success: true, message: "Book Added", book: newBook });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
});


app.post('/api/books/delete', async (req, res) => {
    try {
        const { id } = req.body;
        await prisma.book.delete({ where: { id: Number(id) } });
        res.json({ success: true, message: "Book Deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error deleting book" });
    }
});

app.get('/api/books', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 1000; 
    const category = req.query.category || "All";
    const sort = req.query.sort || "relevant";

    const skip = (page - 1) * limit; 

    const whereClause = {};
    if (category !== "All") {
        const categoryData = await prisma.category.findUnique({ where: { name: category } });
        if (categoryData) {
            whereClause.categoryId = categoryData.id;
        }
    }

    let orderByClause = { createdAt: 'desc' }; 
    if (sort === "low-high") {
        orderByClause = { offerPrice: 'asc' };
    } else if (sort === "high-low") {
        orderByClause = { offerPrice: 'desc' };
    } else if (sort === "name-az") {
        orderByClause = { name: 'asc' };
    }

    const books = await prisma.book.findMany({
      where: whereClause,   
      orderBy: orderByClause,
      skip: skip,           
      take: limit,           
      include: { images: true, category: true }
    });

    const formattedBooks = books.map(book => ({
      _id: book.id.toString(),
      name: book.name,
      description: book.description,
      price: Number(book.price),
      offerPrice: Number(book.offerPrice),
      image: book.images.map(img => img.imageUrl.startsWith('http') ? img.imageUrl : `http://localhost:${PORT}${img.imageUrl}`), 
      category: book.category ? book.category.name : "Uncategorized",
      popular: book.popular,
      inStock: book.inStock
    }));

    res.json({ success: true, data: formattedBooks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/categories', async (req, res) => {
    try {
      const categories = await prisma.category.findMany();
      const formatted = categories.map(cat => ({
        _id: cat.id.toString(),
        name: cat.name,
        image: cat.imageUrl
      }));
      res.json({ success: true, data: formatted });
    } catch (error) { res.status(500).json({message: error.message}); }
});

app.post('/api/user/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const exists = await prisma.user.findUnique({ where: { email } });
        if (exists) return res.json({ success: false, message: "User already exists" });
        if (password.length < 4) return res.json({ success: false, message: "Password too short" });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await prisma.user.create({ data: { firstName: name, email, passwordHash: hashedPassword } });
        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET || "secret_key");
        res.json({ success: true, token, user: { name: newUser.firstName, email: newUser.email } });
    } catch (error) { res.json({ success: false, message: error.message }); }
});

app.post('/api/user/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.json({ success: false, message: "User not found" });
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) return res.json({ success: false, message: "Invalid credentials" });
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "secret_key");
        res.json({ success: true, token, user: { name: user.firstName, email: user.email } });
    } catch (error) { res.json({ success: false, message: error.message }); }
});

app.get('/api/orders', async (req, res) => {
    try {
      const orders = await prisma.order.findMany({
        include: { items: { include: { book: { include: { images: true } } } }, address: true }, //Перегляд звʼязаних даних
        orderBy: { createdAt: 'desc' }
      });
      const formatted = orders.map(order => ({
          _id: order.id.toString(),
          address: order.address || {}, 
          items: order.items.map(item => ({
              book: {
                  name: item.book ? item.book.name : "Book Deleted",
                  offerPrice: Number(item.price),
                  image: item.book && item.book.images.length > 0 ? [item.book.images[0].imageUrl] : ["/assets/books/book_1.png"]
              },
              quantity: item.quantity
          })),
          amount: Number(order.totalAmount),
          status: order.status,
          paymentMethod: order.paymentMethod,
          isPaid: order.isPaid,
          createdAt: order.createdAt
      }))
      res.json({ success: true, data: formatted });
    } catch (error) { res.status(500).json({ success: false, message: "Error fetching orders" }); }
});

app.post('/api/userorders', authUser, async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await prisma.order.findMany({
            where: { userId: userId },
            include: { items: { include: { book: { include: { images: true } } } }, address: true },
            orderBy: { createdAt: 'desc' }
        });
        const formatted = orders.map(order => ({
            _id: order.id.toString(),
            address: order.address || {}, 
            items: order.items.map(item => ({
                book: {
                    name: item.book ? item.book.name : "Book Deleted",
                    offerPrice: Number(item.price),
                    image: item.book && item.book.images.length > 0 ? [item.book.images[0].imageUrl] : ["/assets/books/book_1.png"]
                },
                quantity: item.quantity
            })),
            amount: Number(order.totalAmount),
            status: order.status,
            paymentMethod: order.paymentMethod,
            isPaid: order.isPaid,
            createdAt: order.createdAt
        }))
        res.json({ success: true, data: formatted });
    } catch (error) { res.json({ success: false, message: error.message }); }
})

app.post('/api/orders/place', authUser, async (req, res) => {
    try {
        const { items, amount, address, paymentMethod, userId } = req.body;
        const newAddress = await prisma.address.create({
            data: {
                userId: userId,
                firstName: address.firstName, lastName: address.lastName, email: address.email,
                city: address.city, country: address.country, phone: address.phone
            }
        });
        await prisma.order.create({
            data: {
                userId: userId,
                addressId: newAddress.id,
                totalAmount: amount,
                paymentMethod: paymentMethod,
                status: "Order Placed",
                items: {
                    create: items.map(item => ({
                        bookId: Number(item._id), 
                        quantity: item.quantity,
                        price: item.offerPrice || item.price
                    }))
                }
            }
        });
        res.json({ success: true, message: "Order Placed Successfully" });
    } catch (error) { res.json({ success: false, message: error.message }); }
});

app.post('/api/order/status', async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await prisma.order.update({ where: { id: Number(orderId) }, data: { status: status } });
        res.json({ success: true, message: "Status Updated" });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

app.post('/api/books/single', async (req, res) => {
    try {
        const { id } = req.body;
        const book = await prisma.book.findUnique({
            where: { id: Number(id) },
            include: { images: true, category: true }
        });
        
        if (!book) return res.json({ success: false, message: "Book not found" });

        const formattedBook = {
            ...book,
            image: book.images.length > 0 ? getImageUrl(book.images[0].imageUrl) : ""
        };

        res.json({ success: true, data: formattedBook });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
});

app.post('/api/books/edit', upload.single('image'), async (req, res) => {
    try {
        const { id, name, description, price, offerPrice, category, popular } = req.body;
        
        let catEntry = await prisma.category.findUnique({ where: { name: category } });
        if (!catEntry) {
            catEntry = await prisma.category.findFirst();
        }

        const updateData = {
            name,
            description,
            price: Number(price),
            offerPrice: Number(offerPrice),
            popular: popular === 'true', 
            categoryId: catEntry.id
        };

        if (req.file) {
            const imageUrl = getImageUrl(req.file.filename);
            await prisma.bookImage.deleteMany({ where: { bookId: Number(id) } });
            updateData.images = {
                create: { imageUrl: imageUrl }
            };
        }

        await prisma.book.update({
            where: { id: Number(id) },
            data: updateData
        });

        res.json({ success: true, message: "Book Updated Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error updating book" });
    }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});