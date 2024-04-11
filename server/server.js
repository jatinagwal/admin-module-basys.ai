const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
const pool = new Pool({
 connectionString: process.env.DATABASE_URL,
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
       console.error('Error connecting to the database:', err);
    } else {
       console.log('Database connection test successful:', res.rows[0]);
    }
   });
// Multer setup for file uploads
const storage = multer.diskStorage({
 destination: (req, file, cb) => {
    cb(null, 'uploads/');
 },
 filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
 },
});

const upload = multer({ storage: storage });

// Routes
app.post('/submit-form', upload.fields([{ name: 'license' }, { name: 'insurance' }, { name: 'businessCertification' }]), async (req, res) => {
    try {
       console.log('Request body:', req.body);
       console.log('Request files:', req.files);
       // Extract form data
       const { name, email, phone, physicalAddress, billingAddress, specialty, username, password, usertype } = req.body;
       const { license, insurance, businessCertification } = req.files;
       // Log the received data for debugging
       console.log('Received data:', { name, email, phone, physicalAddress, billingAddress, specialty, license, insurance, businessCertification, username, password, usertype });
   
       // Check if files were uploaded and access their paths safely
       const licensePath = license && license.length > 0 ? license[0].path : null;
       const insurancePath = insurance && insurance.length > 0 ? insurance[0].path : null;
       const businessCertificationPath = businessCertification && businessCertification.length > 0 ? businessCertification[0].path : null;
   
       // Insert data into the database
       // Note: You should hash the password before storing it in the database for security reasons.
       const query = `INSERT INTO entities (name, email, phone, physical_address, billing_address, specialty, license, insurance, business_certification, username, password, usertype) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`;
       const values = [name, email, phone, physicalAddress, billingAddress, specialty, licensePath, insurancePath, businessCertificationPath, username, password, usertype];
   
       const result = await pool.query(query, values);
   
       // Send response
       res.status(200).json({ message: 'Form submitted successfully', data: result.rows[0] });
    } catch (error) {
       console.error('Error processing form submission:', error);
       res.status(500).json({ message: 'Server error' });
    }
   });

// Start the server
app.listen(port, () => {
 console.log(`Server is running on port ${port}`);
});