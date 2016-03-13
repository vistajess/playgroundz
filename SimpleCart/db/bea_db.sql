-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 13, 2016 at 05:34 AM
-- Server version: 10.1.9-MariaDB
-- PHP Version: 5.6.15

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

CREATE TABLE `product_tbl` (
  `id` int(4) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(250) NOT NULL,
  `price` int(10) NOT NULL,
  `quantity` int(10) NOT NULL,
  `image_path` varchar(250) NOT NULL,
  `category_id` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_tbl`
--

INSERT INTO `product_tbl` (`id`, `name`, `description`, `price`, `quantity`, `image_path`, `category_id`) VALUES
(1, 'Iphone 6', 'Sample Description', 40000, 120, 'images/prod1.jpg', '1'),
(2, 'Power Bank', 'Power Bank', 250, 230, 'images/prod2.jpg', '1'),
(3, 'Bea Anne Cruz', 'Confident.overload()', 4500, 15, 'images/prod3.jpg', '3'),
(4, 'Laptop', 'Matibay na laptop, kahit basain mababasa pa rin', 25000, 20, 'images/prod4.jpg', '2'),
(12, 'sample Item', 'description', 100, 20, 'images/prod4.jpg', '4'),
(13, 'Item 13', 'wtf', 190, 20, 'images/prod2.jpg', '1'),
(14, 'qweqwe', 'qweqwe', 20, 44, 'images/prod3.jpg', '2'),
(15, 'Product ', 'description', 122, 42, 'images/prod1.jpg', '4');

-- --------------------------------------------------------

--
-- Table structure for table `tblcategory`
--

CREATE TABLE `tblcategory` (
  `category_id` int(20) NOT NULL,
  `category_name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblcategory`
--

INSERT INTO `tblcategory` (`category_id`, `category_name`) VALUES
(1, 'sample category 1'),
(2, 'sample category 2'),
(3, 'category 3'),
(4, 'category 4');

-- --------------------------------------------------------

--
-- Table structure for table `tbluser`
--

CREATE TABLE `tbluser` (
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
(13, 'asd', 'asd', 'asd', NULL, 'asd', NULL, NULL, 'asd', 2, NULL),
(14, 'user', 'pass', 'firstname', NULL, 'lastname', 'contact', NULL, 'address', 2, NULL),
(15, 'jess', 'jess', 'jess', NULL, 'jess', 'jess', NULL, 'jess', 2, NULL),
(16, 'asd', 'asd', 'asd', NULL, 'asd', 'asd', NULL, 'asd', 2, NULL),
(17, 'zxc', 'zxc', 'zxc', NULL, 'zxc', 'azx', NULL, 'zxc', 2, NULL),
(18, 'ddd', 'ddd', 'ddd', NULL, 'ddd', 'ddd', NULL, 'ddd', 2, NULL),
(19, 'zxc', 'zxc', 'czx', NULL, 'zxc', 'zxc', NULL, 'zxcz', 2, NULL),
(20, 'zxc', 'zxc', 'zxc', NULL, 'zxc', 'zxc', NULL, 'zxc', 2, NULL),
(21, 'qwe', 'qwe', 'qwe', NULL, 'qwe', 'qwe', NULL, 'qwe', 2, NULL),
(22, 'user', 'pass', 'fname', NULL, 'lname', 'contact', NULL, 'address', 2, NULL),
(23, 'pop', 'opo', 'popo', NULL, 'popo', 'popo', NULL, 'popo', 2, NULL),
(24, '123', '123', '123', NULL, '123', '123', NULL, '123', 2, NULL),
(25, 'sd', 'sd', 'sd', NULL, 'sd', 'sd', NULL, 'sd', 2, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbluser_type`
--

CREATE TABLE `tbluser_type` (
  `userTypeID` int(11) NOT NULL,
  `type` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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

CREATE TABLE `tbl_order` (
  `id` int(11) NOT NULL,
  `order_id` varchar(50) NOT NULL,
  `user_id` varchar(10) NOT NULL,
  `product_id` varchar(10) NOT NULL,
  `price` int(100) NOT NULL,
  `quantity` int(100) NOT NULL,
  `subtotal` double(20,2) NOT NULL,
  `total` double(20,2) NOT NULL,
  `date_purchased` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
(39, '21', '13', '2', 250, 1, 250.00, 250.00, '2016-02-07 12:43:12'),
(40, '22', '14', '1', 40000, 1, 40000.00, 69750.00, '2016-03-13 05:10:26'),
(41, '22', '14', '2', 250, 1, 250.00, 69750.00, '2016-03-13 05:10:26'),
(42, '22', '14', '3', 4500, 1, 4500.00, 69750.00, '2016-03-13 05:10:26'),
(43, '22', '14', '4', 25000, 1, 25000.00, 69750.00, '2016-03-13 05:10:26'),
(44, '23', '15', '1', 40000, 1, 40000.00, 44750.00, '2016-03-13 05:12:30'),
(45, '23', '15', '2', 250, 1, 250.00, 44750.00, '2016-03-13 05:12:30'),
(46, '23', '15', '3', 4500, 1, 4500.00, 44750.00, '2016-03-13 05:12:30'),
(47, '24', '16', '13', 190, 1, 190.00, 332.00, '2016-03-13 05:14:13'),
(48, '24', '16', '14', 20, 1, 20.00, 332.00, '2016-03-13 05:14:13'),
(49, '24', '16', '15', 122, 1, 122.00, 332.00, '2016-03-13 05:14:13'),
(50, '25', '17', '1', 40000, 1, 40000.00, 44750.00, '2016-03-13 05:16:18'),
(51, '25', '17', '2', 250, 1, 250.00, 44750.00, '2016-03-13 05:16:18'),
(52, '25', '17', '3', 4500, 1, 4500.00, 44750.00, '2016-03-13 05:16:18'),
(53, '26', '18', '1', 40000, 1, 40000.00, 44750.00, '2016-03-13 05:17:07'),
(54, '26', '18', '2', 250, 1, 250.00, 44750.00, '2016-03-13 05:17:07'),
(55, '26', '18', '3', 4500, 1, 4500.00, 44750.00, '2016-03-13 05:17:07'),
(56, '27', '21', '1', 40000, 2, 80000.00, 105250.00, '2016-03-13 05:25:02'),
(57, '27', '21', '2', 250, 1, 250.00, 105250.00, '2016-03-13 05:25:02'),
(58, '27', '21', '4', 25000, 1, 25000.00, 105250.00, '2016-03-13 05:25:02'),
(59, '28', '22', '2', 250, 1, 250.00, 9250.00, '2016-03-13 05:27:24'),
(60, '28', '22', '3', 4500, 2, 9000.00, 9250.00, '2016-03-13 05:27:24'),
(61, '29', '23', '2', 250, 1, 250.00, 9250.00, '2016-03-13 05:29:10'),
(62, '29', '23', '3', 4500, 2, 9000.00, 9250.00, '2016-03-13 05:29:10'),
(63, '30', '24', '3', 4500, 1, 4500.00, 4750.00, '2016-03-13 05:31:10'),
(64, '30', '24', '2', 250, 1, 250.00, 4750.00, '2016-03-13 05:31:10'),
(65, '31', '25', '3', 4500, 1, 4500.00, 29500.00, '2016-03-13 05:32:36'),
(66, '31', '25', '4', 25000, 1, 25000.00, 29500.00, '2016-03-13 05:32:36');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_transaction`
--

CREATE TABLE `tbl_transaction` (
  `id` int(5) NOT NULL,
  `order_id` varchar(50) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `product_id` varchar(50) NOT NULL,
  `price` double(20,2) NOT NULL,
  `quantity` int(50) NOT NULL,
  `subtotal` double(20,2) NOT NULL,
  `total` double(20,2) NOT NULL,
  `address` varchar(250) NOT NULL,
  `contact` varchar(250) NOT NULL,
  `date_purchased` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_transaction`
--

INSERT INTO `tbl_transaction` (`id`, `order_id`, `user_id`, `product_id`, `price`, `quantity`, `subtotal`, `total`, `address`, `contact`, `date_purchased`) VALUES
(1, '27', '19', '2', 250.00, 1, 250.00, 4750.00, 'zxcz', 'zxc', '2016-03-13 05:18:29'),
(2, '27', '19', '3', 4500.00, 1, 4500.00, 4750.00, 'zxcz', 'zxc', '2016-03-13 05:18:29'),
(3, '29', '23', '2', 250.00, 1, 250.00, 9250.00, 'popo', 'popo', '2016-03-13 05:29:10'),
(4, '29', '23', '3', 4500.00, 2, 9000.00, 9250.00, 'popo', 'popo', '2016-03-13 05:29:10'),
(5, '30', '24', '3', 4500.00, 1, 4500.00, 4750.00, '123', '123', '2016-03-13 05:31:10'),
(6, '30', '24', '2', 250.00, 1, 250.00, 4750.00, '123', '123', '2016-03-13 05:31:10'),
(7, '31', '25', '3', 4500.00, 1, 4500.00, 29500.00, 'sd', 'sd', '2016-03-13 05:32:36'),
(8, '31', '25', '4', 25000.00, 1, 25000.00, 29500.00, 'sd', 'sd', '2016-03-13 05:32:36');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product_tbl`
--
ALTER TABLE `product_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tblcategory`
--
ALTER TABLE `tblcategory`
  ADD PRIMARY KEY (`category_id`);

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
-- Indexes for table `tbl_transaction`
--
ALTER TABLE `tbl_transaction`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `product_tbl`
--
ALTER TABLE `product_tbl`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `tblcategory`
--
ALTER TABLE `tblcategory`
  MODIFY `category_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `tbluser`
--
ALTER TABLE `tbluser`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT for table `tbluser_type`
--
ALTER TABLE `tbluser_type`
  MODIFY `userTypeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `tbl_order`
--
ALTER TABLE `tbl_order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;
--
-- AUTO_INCREMENT for table `tbl_transaction`
--
ALTER TABLE `tbl_transaction`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
