-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 07, 2016 at 12:44 PM
-- Server version: 5.6.26
-- PHP Version: 5.6.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bea_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `product_tbl`
--

CREATE TABLE IF NOT EXISTS `product_tbl` (
  `id` int(4) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(250) NOT NULL,
  `price` int(10) NOT NULL,
  `quantity` int(10) NOT NULL,
  `image_path` varchar(250) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_tbl`
--

INSERT INTO `product_tbl` (`id`, `name`, `description`, `price`, `quantity`, `image_path`) VALUES
(1, 'Iphone 6', 'Sample Description', 40000, 120, 'images/prod1.jpg'),
(2, 'Power Bank', 'Power Bank', 250, 230, 'images/prod2.jpg'),
(3, 'Bea Anne Cruz', 'Confident.overload()', 4500, 15, 'images/prod3.jpg'),
(4, 'Laptop', 'Matibay na laptop, kahit basain mababasa pa rin', 25000, 20, 'images/prod4.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `tbluser`
--

CREATE TABLE IF NOT EXISTS `tbluser` (
  `userID` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `userpass` varchar(20) NOT NULL,
  `firstName` varchar(40) NOT NULL,
  `middleName` varchar(40) DEFAULT NULL,
  `lastName` varchar(40) NOT NULL,
  `contactNo` varchar(20) DEFAULT NULL,
  `email` varchar(40) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `userTypeID` int(11) NOT NULL,
  `birthdate` date DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbluser`
--

INSERT INTO `tbluser` (`userID`, `username`, `userpass`, `firstName`, `middleName`, `lastName`, `contactNo`, `email`, `address`, `userTypeID`, `birthdate`) VALUES
(1, 'admin', 'admin', 'Kim', 'Aquino', 'Aquino', '00000000000', 'admin@yahoo.com', 'malolos, bulacan', 1, '1991-05-01'),
(2, 'guest', 'guest', 'Kim', NULL, 'Aquino', '00000000001', 'kim@yahoo.com', 'makati city', 2, '1991-05-01'),
(3, 'frontdesk', 'frontdesk', 'Kim', NULL, 'Aquino', '00000000003', 'frontdesk@ymail.com', NULL, 2, '2014-09-03'),
(4, 'guest', 'VanElla', 'Kim', 'Aquino', 'Aquino', '00000000004', 'kimmy@yahoo.com', NULL, 3, '1930-10-14'),
(5, 'guest', 'guest', 'guest', 'guest', 'guest', '00000000005', 'guest@yahoo.com', NULL, 3, '1920-10-13'),
(6, 'guest', 'rizal', 'Jose', 'Protacio', 'Rizal', '00000000006', 'joserizal@yahoo.com', NULL, 3, '1990-09-02'),
(7, 'guest', 'joyjoy', 'joy', 'Aquino', 'Aquino', '00000000007', 'joy@gmail.com', NULL, 3, '2015-10-03'),
(8, 'guest', 'kevin', 'kevin', 'garchi', 'cipriano', '00000000008', 'kevin@yahoo.com', NULL, 3, '1996-07-27'),
(9, 'guest', 'chibi', 'chibi', 'chibi', 'chibi', '00000000011', 'chibi@yahoo.com', NULL, 3, '2016-02-23'),
(12, 'user', 'pass', 'fname', NULL, 'lname', NULL, NULL, 'address', 2, NULL),
(13, 'asd', 'asd', 'asd', NULL, 'asd', NULL, NULL, 'asd', 2, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbluser_type`
--

CREATE TABLE IF NOT EXISTS `tbluser_type` (
  `userTypeID` int(11) NOT NULL,
  `type` varchar(20) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbluser_type`
--

INSERT INTO `tbluser_type` (`userTypeID`, `type`) VALUES
(1, 'Administrator'),
(2, 'Guest');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_order`
--

CREATE TABLE IF NOT EXISTS `tbl_order` (
  `id` int(11) NOT NULL,
  `order_id` varchar(50) NOT NULL,
  `user_id` varchar(10) NOT NULL,
  `product_id` varchar(10) NOT NULL,
  `price` int(100) NOT NULL,
  `quantity` int(100) NOT NULL,
  `subtotal` double(20,2) NOT NULL,
  `total` double(20,2) NOT NULL,
  `date_purchased` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_order`
--

INSERT INTO `tbl_order` (`id`, `order_id`, `user_id`, `product_id`, `price`, `quantity`, `subtotal`, `total`, `date_purchased`) VALUES
(1, '1', '2', '2', 250, 1, 250.00, 2504000025000.00, '2016-02-07 09:46:37'),
(2, '1', '2', '1', 40000, 1, 40000.00, 2504000025000.00, '2016-02-07 09:46:37'),
(3, '1', '2', '4', 25000, 1, 25000.00, 2504000025000.00, '2016-02-07 09:46:37'),
(4, '2', '2', '2', 250, 1, 250.00, 25040000.00, '2016-02-07 09:47:43'),
(5, '2', '2', '1', 40000, 1, 40000.00, 25040000.00, '2016-02-07 09:47:43'),
(6, '3', '2', '1', 40000, 1, 40000.00, 40000250004500250.00, '2016-02-07 09:49:55'),
(7, '3', '2', '4', 25000, 1, 25000.00, 40000250004500250.00, '2016-02-07 09:49:55'),
(8, '3', '2', '3', 4500, 1, 4500.00, 40000250004500250.00, '2016-02-07 09:49:55'),
(9, '3', '2', '2', 250, 1, 250.00, 40000250004500250.00, '2016-02-07 09:49:55'),
(10, '4', '2', '2', 250, 1, 250.00, 25040000.00, '2016-02-07 10:13:39'),
(11, '4', '2', '1', 40000, 1, 40000.00, 25040000.00, '2016-02-07 10:13:39'),
(12, '5', '2', '2', 250, 1, 250.00, 25040000.00, '2016-02-07 10:26:49'),
(13, '5', '2', '1', 40000, 1, 40000.00, 25040000.00, '2016-02-07 10:26:49'),
(14, '6', '2', '2', 250, 1, 250.00, 25040000.00, '2016-02-07 10:27:41'),
(15, '6', '2', '1', 40000, 1, 40000.00, 25040000.00, '2016-02-07 10:27:41'),
(16, '7', '2', '4', 25000, 1, 25000.00, 250004500250.00, '2016-02-07 10:29:34'),
(17, '7', '2', '3', 4500, 1, 4500.00, 250004500250.00, '2016-02-07 10:29:34'),
(18, '7', '2', '2', 250, 1, 250.00, 250004500250.00, '2016-02-07 10:29:34'),
(19, '8', '2', '2', 250, 1, 250.00, 2504000025000.00, '2016-02-07 11:03:08'),
(20, '8', '2', '1', 40000, 1, 40000.00, 2504000025000.00, '2016-02-07 11:03:08'),
(21, '8', '2', '4', 25000, 1, 25000.00, 2504000025000.00, '2016-02-07 11:03:08'),
(22, '9', '2', '2', 250, 1, 250.00, 25040000.00, '2016-02-07 11:04:33'),
(23, '9', '2', '1', 40000, 1, 40000.00, 25040000.00, '2016-02-07 11:04:33'),
(24, '10', '2', '2', 250, 1, 250.00, 250.00, '2016-02-07 11:16:23'),
(25, '11', '', '2', 250, 1, 250.00, 250.00, '2016-02-07 12:03:15'),
(26, '12', '2', '2', 250, 1, 250.00, 250.00, '2016-02-07 12:04:35'),
(27, '13', '2', '2', 250, 1, 250.00, 250.00, '2016-02-07 12:07:09'),
(28, '14', '2', '2', 250, 1, 250.00, 250.00, '2016-02-07 12:08:17'),
(29, '15', '2', '1', 40000, 2, 80000.00, 800004500.00, '2016-02-07 12:09:59'),
(30, '15', '2', '3', 4500, 1, 4500.00, 800004500.00, '2016-02-07 12:09:59'),
(31, '15', '2', '1', 40000, 2, 80000.00, 800004500.00, '2016-02-07 12:09:59'),
(32, '15', '2', '3', 4500, 1, 4500.00, 800004500.00, '2016-02-07 12:09:59'),
(33, '16', '2', '2', 250, 1, 250.00, 250.00, '2016-02-07 12:11:57'),
(34, '17', '2', '1', 40000, 1, 40000.00, 40000.00, '2016-02-07 12:12:13'),
(35, '18', 'S', '2', 250, 1, 250.00, 25040000.00, '2016-02-07 12:34:21'),
(36, '18', 'S', '1', 40000, 1, 40000.00, 25040000.00, '2016-02-07 12:34:21'),
(37, '19', '12', '2', 250, 1, 250.00, 250.00, '2016-02-07 12:37:35'),
(38, '20', '12', '2', 250, 1, 250.00, 250.00, '2016-02-07 12:42:33'),
(39, '21', '13', '2', 250, 1, 250.00, 250.00, '2016-02-07 12:43:12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product_tbl`
--
ALTER TABLE `product_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbluser`
--
ALTER TABLE `tbluser`
  ADD PRIMARY KEY (`userID`),
  ADD KEY `tblUser_userTypeID_FK` (`userTypeID`);

--
-- Indexes for table `tbluser_type`
--
ALTER TABLE `tbluser_type`
  ADD PRIMARY KEY (`userTypeID`);

--
-- Indexes for table `tbl_order`
--
ALTER TABLE `tbl_order`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `product_tbl`
--
ALTER TABLE `product_tbl`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `tbluser`
--
ALTER TABLE `tbluser`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `tbluser_type`
--
ALTER TABLE `tbluser_type`
  MODIFY `userTypeID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `tbl_order`
--
ALTER TABLE `tbl_order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=40;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
