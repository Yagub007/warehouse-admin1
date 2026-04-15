const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Create 'uploads' folder if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Serve uploaded images statically
app.use('/uploads', express.static(uploadDir));

// Configure Multer for handling file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// In-memory database (will reset when server restarts)
let inventoryDb = [
    { 
        id: 1, 
        inventory_name: "Initial Box", 
        description: "Test description for the first item.", 
        photoUrl: "http://localhost:3000/uploads/placeholder.png" 
    }
];
let currentId = 2;

// ==========================================
// API ENDPOINTS
// ==========================================

// 1. GET /api/inventory - Get all items
app.get('/api/inventory', (req, res) => {
    res.json(inventoryDb);
});

// 2. GET /api/inventory/:id - Get single item
app.get('/api/inventory/:id', (req, res) => {
    const item = inventoryDb.find(i => i.id == req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
});

// 3. POST /api/register - Create new item (Multipart Form)
app.post('/api/register', upload.single('photo'), (req, res) => {
    const { inventory_name, description } = req.body;
    
    if (!inventory_name) {
        return res.status(400).json({ error: "Inventory name is required" });
    }

    const newItem = {
        id: currentId++,
        inventory_name,
        description: description || "",
        photoUrl: req.file ? `http://localhost:3000/uploads/${req.file.filename}` : null
    };

    inventoryDb.push(newItem);
    res.status(201).json(newItem);
});

// 4. PUT /api/inventory/:id - Update text data (JSON)
app.put('/api/inventory/:id', (req, res) => {
    const { inventory_name, description } = req.body;
    const itemIndex = inventoryDb.findIndex(i => i.id == req.params.id);

    if (itemIndex === -1) return res.status(404).json({ error: "Item not found" });

    inventoryDb[itemIndex] = {
        ...inventoryDb[itemIndex],
        inventory_name: inventory_name || inventoryDb[itemIndex].inventory_name,
        description: description !== undefined ? description : inventoryDb[itemIndex].description
    };

    res.json(inventoryDb[itemIndex]);
});

// 5. PUT /api/inventory/:id/photo - Update photo independently (Multipart Form)
app.put('/api/inventory/:id/photo', upload.single('photo'), (req, res) => {
    const itemIndex = inventoryDb.findIndex(i => i.id == req.params.id);

    if (itemIndex === -1) return res.status(404).json({ error: "Item not found" });
    if (!req.file) return res.status(400).json({ error: "No photo provided" });

    inventoryDb[itemIndex].photoUrl = `http://localhost:3000/uploads/${req.file.filename}`;
    
    res.json(inventoryDb[itemIndex]);
});

// 6. DELETE /api/inventory/:id - Delete an item
app.delete('/api/inventory/:id', (req, res) => {
    const itemIndex = inventoryDb.findIndex(i => i.id == req.params.id);
    if (itemIndex === -1) return res.status(404).json({ error: "Item not found" });

    inventoryDb.splice(itemIndex, 1);
    res.json({ success: true, message: "Item deleted successfully" });
});

// Start Server
app.listen(PORT, () => {
    console.log(`✅ Backend API Server running at http://localhost:${PORT}`);
});
