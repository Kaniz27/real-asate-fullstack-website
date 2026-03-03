-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 03, 2026 at 07:42 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `real_estate_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `hero_backgrounds`
--

CREATE TABLE `hero_backgrounds` (
  `id` int(11) NOT NULL,
  `type` varchar(50) DEFAULT 'image',
  `url` varchar(255) NOT NULL,
  `alt` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hero_backgrounds`
--

INSERT INTO `hero_backgrounds` (`id`, `type`, `url`, `alt`) VALUES
(1, 'image', 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1920', 'Modern villa with pool'),
(2, 'image', 'https://images.unsplash.com/photo-1600585154340-be6199f7d009?auto=format&fit=crop&q=80&w=1920', 'Luxury interior living room'),
(3, 'image', 'https://images.unsplash.com/photo-1600607687940-477a4a982998?auto=format&fit=crop&q=80&w=1920', 'Aerial view of suburban housing');

-- --------------------------------------------------------

--
-- Table structure for table `hero_cta_buttons`
--

CREATE TABLE `hero_cta_buttons` (
  `id` varchar(50) NOT NULL,
  `label` varchar(255) NOT NULL,
  `action` varchar(255) NOT NULL,
  `variant` varchar(50) NOT NULL,
  `is_enabled` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hero_cta_buttons`
--

INSERT INTO `hero_cta_buttons` (`id`, `label`, `action`, `variant`, `is_enabled`) VALUES
('contact-now', 'Contact Now', '/contact', 'secondary', 1),
('view-properties', 'View Properties', '/properties', 'primary', 1);

-- --------------------------------------------------------

--
-- Table structure for table `hero_settings`
--

CREATE TABLE `hero_settings` (
  `id` int(11) NOT NULL,
  `headline` varchar(255) NOT NULL,
  `subheadline` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hero_settings`
--

INSERT INTO `hero_settings` (`id`, `headline`, `subheadline`) VALUES
(1, 'Find Your Perfect Dream Home', 'Experience luxury living with our curated list of exclusive properties in prime locations.');

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`id`, `name`) VALUES
(2, 'Abu Dhabi'),
(1, 'Dubai'),
(3, 'Sharjah');

-- --------------------------------------------------------

--
-- Table structure for table `properties`
--

CREATE TABLE `properties` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `location_id` int(11) DEFAULT NULL,
  `property_type_id` int(11) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `status` enum('Ready','Upcoming','Ongoing','Completed') NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `is_featured` tinyint(1) DEFAULT 0,
  `featured_order` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `properties`
--

INSERT INTO `properties` (`id`, `title`, `description`, `location_id`, `property_type_id`, `price`, `status`, `image_url`, `is_featured`, `featured_order`) VALUES
(1, 'Luxury Villa in Palm Jumeirah', 'Stunning 5-bedroom villa with private beach access.', 1, 1, 15000000.00, 'Ready', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750', 1, 1),
(2, 'Modern Apartment in Downtown', 'High-floor apartment with Burj Khalifa views.', 1, 2, 3500000.00, 'Ready', 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267', 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `property_types`
--

CREATE TABLE `property_types` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `property_types`
--

INSERT INTO `property_types` (`id`, `name`) VALUES
(2, 'Apartment'),
(3, 'Penthouse'),
(1, 'Villa');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `setting_key` varchar(255) NOT NULL,
  `setting_value` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`setting_key`, `setting_value`) VALUES
('call_now_button_enabled', '1'),
('call_now_button_phone_number', '+1234567890'),
('featured_properties_visible', '1');

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE `testimonials` (
  `id` int(11) NOT NULL,
  `client_image_url` varchar(255) DEFAULT NULL,
  `client_name` varchar(255) NOT NULL,
  `rating` int(11) NOT NULL,
  `comment` text NOT NULL,
  `is_approved` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `testimonials`
--

INSERT INTO `testimonials` (`id`, `client_image_url`, `client_name`, `rating`, `comment`, `is_approved`) VALUES
(1, 'https://randomuser.me/api/portraits/women/65.jpg', 'Jane Doe', 5, 'An amazing experience from start to finish. Highly recommended!', 1),
(2, 'https://randomuser.me/api/portraits/men/32.jpg', 'John Smith', 4, 'Very professional and helpful team. They found us the perfect home.', 1),
(3, 'https://randomuser.me/api/portraits/women/44.jpg', 'Emily Jones', 5, 'I could not be happier with my new apartment. The process was so smooth.', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','owner','user') DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `email`, `phone`, `password`, `role`, `created_at`, `updated_at`) VALUES
(1, 'Admin User', 'admin@realestate.com', '+971501234567', '$2b$10$ZQv.KhdIf0.0XGvGEqvUWOx5Q4z.UnTyhPPz1cf7w.wot.raedPXe', 'admin', '2026-03-03 05:47:44', '2026-03-03 05:47:44'),
(2, 'John Owner', 'owner@realestate.com', '+971501234568', '$2b$10$5MbwinfSe9oYrkytyx5K4.PPjTzH0PZQGcel8IgRznUfIgZ4gDyBC', 'owner', '2026-03-03 05:47:44', '2026-03-03 05:47:44'),
(3, 'Jane User', 'user@realestate.com', '+971501234569', '$2b$10$wGPAZh5b74ZpZCmrkqc3W.WtiHNKVmsQMu3MF6gY/bN153DEIo6la', 'user', '2026-03-03 05:47:44', '2026-03-03 05:47:44');

-- --------------------------------------------------------

--
-- Table structure for table `why_choose_us_items`
--

CREATE TABLE `why_choose_us_items` (
  `id` int(11) NOT NULL,
  `icon` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `display_order` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `why_choose_us_items`
--

INSERT INTO `why_choose_us_items` (`id`, `icon`, `title`, `description`, `display_order`) VALUES
(1, 'fa-home', 'Wide Range of Properties', 'We offer a diverse portfolio of properties to suit every need and budget.', 1),
(2, 'fa-users', 'Expert Agents', 'Our experienced agents are here to guide you through every step of the process.', 2),
(3, 'fa-tags', 'Best Price Guarantee', 'We ensure you get the best value for your investment with transparent pricing.', 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `hero_backgrounds`
--
ALTER TABLE `hero_backgrounds`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hero_cta_buttons`
--
ALTER TABLE `hero_cta_buttons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hero_settings`
--
ALTER TABLE `hero_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `properties`
--
ALTER TABLE `properties`
  ADD PRIMARY KEY (`id`),
  ADD KEY `location_id` (`location_id`),
  ADD KEY `property_type_id` (`property_type_id`);

--
-- Indexes for table `property_types`
--
ALTER TABLE `property_types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`setting_key`);

--
-- Indexes for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone` (`phone`);

--
-- Indexes for table `why_choose_us_items`
--
ALTER TABLE `why_choose_us_items`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `hero_backgrounds`
--
ALTER TABLE `hero_backgrounds`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `hero_settings`
--
ALTER TABLE `hero_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `properties`
--
ALTER TABLE `properties`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `property_types`
--
ALTER TABLE `property_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `why_choose_us_items`
--
ALTER TABLE `why_choose_us_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `properties`
--
ALTER TABLE `properties`
  ADD CONSTRAINT `properties_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`),
  ADD CONSTRAINT `properties_ibfk_2` FOREIGN KEY (`property_type_id`) REFERENCES `property_types` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
