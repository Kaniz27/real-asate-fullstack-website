const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'https://walrus-healthy-cobra.ngrok-free.app',
    'http://localhost:3000',
    'http://localhost:5000',
    'http://localhost:3000',
  ],
  credentials: true, // Allow cookies and authorization headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'ngrok-skip-browser-warning'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
}));
app.use(helmet());
app.use(express.json());

// Serve uploaded images as static files
app.use('/uploads/images', express.static(path.join(__dirname, 'uploads', 'images')));

// Basic Route
app.get('/', (req, res) => {
  res.send('Real Estate API is running...');
});

// Route to preview Postman Collection
app.get('/postman', (req, res) => {
  res.sendFile(path.join(__dirname, 'Real Eastate BackEnd.postman_collection.json'));
});

// Import Routes
const authRoutes = require('./routes/authRoutes');
const heroRoutes = require('./routes/heroRoutes');
const adminRoutes = require('./routes/adminRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const siteContentRoutes = require('./routes/siteContentRoutes');
const imageRoutes = require('./routes/imageRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/hero', heroRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/content', siteContentRoutes);
app.use('/api/images', imageRoutes);

// Database Setup and Seeding
const setupDatabase = require('./config/dbSetup');
setupDatabase();

// Start Server
// for now this port forward: https://walrus-healthy-cobra.ngrok-free.app/api
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
