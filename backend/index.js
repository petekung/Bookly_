// ref : 37aa88161f
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const jwt = require('jsonwebtoken');
const supabase = require('./db/supabase');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

// Middleware
app.use(cors());
app.use(express.json());

// --- Authentication Middleware ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
  
  if (!token) {
    return res.status(401).json({ error: "Access denied: session credential missing or expired" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ error: "Access denied: session credential missing or expired" });
    }
    req.user = user;
    next();
  });
};

// --- Routes ---

// Login Endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body || {};
  
  // ตรวจสอบ Username / Password ตามที่ตกลงกันไว้
  if (username === 'admin' && password === 'password') {
    const user = { username: username };
    // สร้าง Token กำหนดวันหมดอายุ 1 ชั่วโมง
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// GET /api/books: ดึงข้อมูลหนังสือทั้งหมด
app.get('/api/books', async (req, res) => {
  const { data, error } = await supabase.from('books').select('*').order('created_at', { ascending: false });
  
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

// POST /api/books: เพิ่มหนังสือใหม่ (ต้องมี Token)
app.post('/api/books', authenticateToken, async (req, res) => {
  const { title, author, category } = req.body || {};
  
  const { data, error } = await supabase
    .from('books')
    .insert([{ title, author, category }])
    .select();
    
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.status(201).json(data[0]);
});

// DELETE /api/books/:id: ลบหนังสือ (ต้องมี Token)
app.delete('/api/books/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  
  const { error } = await supabase.from('books').delete().eq('id', id);
  
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json({ message: 'Book deleted successfully' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Book library server is up and ready to roll on port ${PORT}`);
});
