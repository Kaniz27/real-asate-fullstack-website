const mysql = require('mysql2/promise');
const bcryptjs = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const setupDatabase = async () => {
  let connection;
  try {
    // 1. Connect without database to create it if it doesn't exist
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    console.log(`Checking for database ${process.env.DB_NAME}...`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    await connection.end();

    // 2. Connect with database for tables setup
    const db = require('./db');

    // Create tables if they don't exist
    console.log('Setting up tables...');
    
    // Drop tables to ensure a clean start with new schema
    await db.query('DROP TABLE IF EXISTS properties, hero_backgrounds, hero_cta_buttons, hero_settings, locations, property_types, settings, why_choose_us_items, testimonials, users;');

    // Users Table (for authentication with roles)
    await db.query(`
      CREATE TABLE users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone VARCHAR(20) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'owner', 'user') DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Hero Section Tables
    await db.query(`
      CREATE TABLE hero_settings (
        id INT PRIMARY KEY AUTO_INCREMENT,
        headline VARCHAR(255) NOT NULL,
        subheadline TEXT NOT NULL
      )
    `);

    await db.query(`
      CREATE TABLE hero_backgrounds (
        id INT PRIMARY KEY AUTO_INCREMENT,
        type VARCHAR(50) DEFAULT 'image',
        url VARCHAR(255) NOT NULL,
        alt VARCHAR(255) NOT NULL
      )
    `);

    await db.query(`
      CREATE TABLE hero_cta_buttons (
        id VARCHAR(50) PRIMARY KEY,
        label VARCHAR(255) NOT NULL,
        action VARCHAR(255) NOT NULL,
        variant VARCHAR(50) NOT NULL,
        is_enabled TINYINT(1) DEFAULT 1
      )
    `);

    // Property Tables
    await db.query(`
      CREATE TABLE locations (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL UNIQUE
      )
    `);

    await db.query(`
      CREATE TABLE property_types (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL UNIQUE
      )
    `);

    await db.query(`
      CREATE TABLE properties (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        location_id INT,
        property_type_id INT,
        price DECIMAL(10, 2) NOT NULL,
        status ENUM('Ready', 'Upcoming', 'Ongoing', 'Completed') NOT NULL,
        image_url VARCHAR(255),
        is_featured TINYINT(1) DEFAULT 0,
        featured_order INT DEFAULT 0,
        FOREIGN KEY (location_id) REFERENCES locations(id),
        FOREIGN KEY (property_type_id) REFERENCES property_types(id)
      )
    `);
    
    // Settings Table
    await db.query(`
      CREATE TABLE settings (
        setting_key VARCHAR(255) PRIMARY KEY,
        setting_value VARCHAR(255) NOT NULL
      )
    `);

    // "Why Choose Us" Table
    await db.query(`
      CREATE TABLE why_choose_us_items (
        id INT PRIMARY KEY AUTO_INCREMENT,
        icon VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        display_order INT DEFAULT 0
      )
    `);

    // Testimonials Table
    await db.query(`
      CREATE TABLE testimonials (
        id INT PRIMARY KEY AUTO_INCREMENT,
        client_image_url VARCHAR(255),
        client_name VARCHAR(255) NOT NULL,
        rating INT NOT NULL,
        comment TEXT NOT NULL,
        is_approved TINYINT(1) DEFAULT 0
      )
    `);

    // // Seeding
    // console.log('Seeding data...');
    
    // // Admin User Seeding
    // const adminPassword = await bcryptjs.hash('admin123', 10);
    // const ownerPassword = await bcryptjs.hash('owner123', 10);
    // const userPassword = await bcryptjs.hash('user123', 10);

    // await db.query('INSERT INTO users (full_name, email, phone, password, role) VALUES ?', [[
    //   ['Admin User', 'admin@realestate.com', '+971501234567', adminPassword, 'admin'],
    //   ['John Owner', 'owner@realestate.com', '+971501234568', ownerPassword, 'owner'],
    //   ['Jane User', 'user@realestate.com', '+971501234569', userPassword, 'user']
    // ]]);

    // console.log('Default Users Created:');
    // console.log('Admin - Email: admin@realestate.com, Password: admin123');
    // console.log('Owner - Email: owner@realestate.com, Password: owner123');
    // console.log('User - Email: user@realestate.com, Password: user123');

    // // Hero Seeding
    // await db.query('INSERT INTO hero_settings (headline, subheadline) VALUES (?, ?)', [
    //   "Find Your Perfect Dream Home",
    //   "Experience luxury living with our curated list of exclusive properties in prime locations."
    // ]);

    // await db.query('INSERT INTO hero_backgrounds (type, url, alt) VALUES ?', [[
    //   ['image', "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1920", "Modern villa with pool"],
    //   ['image', "https://images.unsplash.com/photo-1600585154340-be6199f7d009?auto=format&fit=crop&q=80&w=1920", "Luxury interior living room"],
    //   ['image', "https://images.unsplash.com/photo-1600607687940-477a4a982998?auto=format&fit=crop&q=80&w=1920", "Aerial view of suburban housing"]
    // ]]);

    // await db.query('INSERT INTO hero_cta_buttons (id, label, action, variant, is_enabled) VALUES ?', [[
    //   ["view-properties", "View Properties", "/properties", "primary", 1],
    //   ["contact-now", "Contact Now", "/contact", "secondary", 1]
    // ]]);

    // // Locations & Types
    // await db.query('INSERT INTO locations (name) VALUES ?', [[['Dubai'], ['Abu Dhabi'], ['Sharjah']]]);
    // await db.query('INSERT INTO property_types (name) VALUES ?', [[['Villa'], ['Apartment'], ['Penthouse']]]);

    // // Properties
    // await db.query('INSERT INTO properties (title, description, location_id, property_type_id, price, status, image_url, is_featured, featured_order) VALUES ?', [[
    //   ['Luxury Villa in Palm Jumeirah', 'Stunning 5-bedroom villa with private beach access.', 1, 1, 15000000.00, 'Ready', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750', 1, 1],
    //   ['Modern Apartment in Downtown', 'High-floor apartment with Burj Khalifa views.', 1, 2, 3500000.00, 'Ready', 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267', 1, 2]
    // ]]);
    
    // // Settings Seeding
    // await db.query('INSERT INTO settings (setting_key, setting_value) VALUES ?', [[
    //     ['featured_properties_visible', '1'],
    //     ['call_now_button_enabled', '1'],
    //     ['call_now_button_phone_number', '+1234567890']
    // ]]);

    // // "Why Choose Us" Seeding
    // await db.query('INSERT INTO why_choose_us_items (icon, title, description, display_order) VALUES ?', [[
    //     ['fa-home', 'Wide Range of Properties', 'We offer a diverse portfolio of properties to suit every need and budget.', 1],
    //     ['fa-users', 'Expert Agents', 'Our experienced agents are here to guide you through every step of the process.', 2],
    //     ['fa-tags', 'Best Price Guarantee', 'We ensure you get the best value for your investment with transparent pricing.', 3]
    // ]]);

    // // Testimonials Seeding
    // await db.query('INSERT INTO testimonials (client_image_url, client_name, rating, comment, is_approved) VALUES ?', [[
    //     ['https://randomuser.me/api/portraits/women/65.jpg', 'Jane Doe', 5, 'An amazing experience from start to finish. Highly recommended!', 1],
    //     ['https://randomuser.me/api/portraits/men/32.jpg', 'John Smith', 4, 'Very professional and helpful team. They found us the perfect home.', 1],
    //     ['https://randomuser.me/api/portraits/women/44.jpg', 'Emily Jones', 5, 'I could not be happier with my new apartment. The process was so smooth.', 0]
    // ]]);

    console.log('Database setup and seeding completed successfully.');
  } catch (error) {
    console.error('Database setup failed:', error.message);
  }
};

module.exports = setupDatabase;
