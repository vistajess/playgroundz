-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 15, 2016 at 07:45 PM
-- Server version: 5.6.26
-- PHP Version: 5.6.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce_kim`
--

-- --------------------------------------------------------

--
-- Table structure for table `tblcategory`
--

CREATE TABLE IF NOT EXISTS `tblcategory` (
  `category_id` int(4) NOT NULL,
  `category_name` varchar(250) NOT NULL,
  `category_details` varchar(250) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblcategory`
--

INSERT INTO `tblcategory` (`category_id`, `category_name`, `category_details`) VALUES
(20, 'Food Category', 'category for foods    			'),
(21, 'Apparel Category', 'apparel    			'),
(22, 'Appliances Category', '122    			'),
(23, 'Gadgets Category', '123    			');

-- --------------------------------------------------------

--
-- Table structure for table `tblproduct`
--

CREATE TABLE IF NOT EXISTS `tblproduct` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(250) NOT NULL,
  `category_id` varchar(20) NOT NULL,
  `description` varchar(250) NOT NULL,
  `quantity` int(10) NOT NULL,
  `price` int(250) NOT NULL,
  `product_image` varchar(500) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblproduct`
--

INSERT INTO `tblproduct` (`product_id`, `product_name`, `category_id`, `description`, `quantity`, `price`, `product_image`) VALUES
(36, 'Laptop', '23', 'Wtf', 120, 12000, 'prod4.jpg'),
(37, 'Phone', '23', 'Phone na malupet', 33, 800, 'prod1.jpg'),
(38, 'Cheese cake', '20', 'boom', 120, 800, 'header.png'),
(39, 'Pasta', '20', 'masarap na pasta', 33, 12, 'pasta.jpg'),
(40, 'Burger', '20', 'burger na masarap', 50, 120, 'download.jpg'),
(41, 'Go Pro', '23', 'gopro', 20, 5000, 'gopro.jpg'),
(42, 'cell phone', '23', 'cell phone', 5, 3000, 'cp.jpg'),
(43, 'Nike Flyknit', '21', 'sneakers', 20, 5000, 'nike.jpg'),
(44, 'Apparel', '21', 'qwe', 120, 300, 'apparel.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `tblproduct_tag`
--

CREATE TABLE IF NOT EXISTS `tblproduct_tag` (
  `id` int(11) NOT NULL,
  `product_id` varchar(300) NOT NULL,
  `tag_id` varchar(300) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblproduct_tag`
--

INSERT INTO `tblproduct_tag` (`id`, `product_id`, `tag_id`, `category_id`) VALUES
(83, '36', '34', 23),
(84, '36', '35', 23),
(85, '36', '36', 23),
(86, '37', '37', 23),
(87, '37', '38', 23),
(88, '37', '39', 23),
(89, '38', '40', 20),
(90, '38', '41', 20),
(91, '38', '42', 20),
(92, '39', '40', 20),
(93, '39', '43', 20),
(94, '40', '40', 20),
(96, '41', '34', 23),
(97, '41', '38', 23),
(98, '42', '34', 23),
(99, '42', '38', 23),
(100, '42', '39', 23),
(103, '43', '46', 21),
(104, '43', '44', 21),
(105, '43', '45', 21),
(106, '43', '46', 21),
(107, '43', '44', 21),
(108, '43', '45', 21),
(109, '43', '46', 21),
(110, '44', '45', 21),
(111, '44', '46', 21),
(112, '44', '47', 21);

-- --------------------------------------------------------

--
-- Table structure for table `tbltag`
--

CREATE TABLE IF NOT EXISTS `tbltag` (
  `tag_id` int(6) NOT NULL,
  `tag_name` varchar(250) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbltag`
--

INSERT INTO `tbltag` (`tag_id`, `tag_name`) VALUES
(34, 'gadget'),
(35, 'laptop'),
(36, 'device'),
(37, 'phone'),
(38, 'camera'),
(39, 'cellular'),
(40, 'food'),
(41, 'cake'),
(42, 'cheese'),
(43, 'pasta'),
(44, 'shoes'),
(45, 'fashion'),
(46, 'footwear'),
(47, 'watch');

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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbluser`
--

INSERT INTO `tbluser` (`userID`, `username`, `userpass`, `firstName`, `middleName`, `lastName`, `contactNo`, `email`, `address`, `userTypeID`, `birthdate`) VALUES
(1, 'admin', 'admin', 'Kim', 'Aquino', 'Aquino', '00000000000', 'admin@yahoo.com', 'malolos, bulacan', 1, '1991-05-01'),
(2, 'guest', 'guest', 'Kim', NULL, 'Aquino', '00000000001', 'kim@yahoo.com', 'makati city', 3, '1991-05-01'),
(3, 'frontdesk', 'frontdesk', 'Kim', NULL, 'Aquino', '00000000003', 'frontdesk@ymail.com', NULL, 2, '2014-09-03'),
(4, 'guest', 'VanElla', 'Kim', 'Aquino', 'Aquino', '00000000004', 'kimmy@yahoo.com', NULL, 3, '1930-10-14'),
(5, 'guest', 'guest', 'guest', 'guest', 'guest', '00000000005', 'guest@yahoo.com', NULL, 3, '1920-10-13'),
(6, 'guest', 'rizal', 'Jose', 'Protacio', 'Rizal', '00000000006', 'joserizal@yahoo.com', NULL, 3, '1990-09-02'),
(7, 'guest', 'joyjoy', 'joy', 'Aquino', 'Aquino', '00000000007', 'joy@gmail.com', NULL, 3, '2015-10-03'),
(8, 'guest', 'kevin', 'kevin', 'garchi', 'cipriano', '00000000008', 'kevin@yahoo.com', NULL, 3, '1996-07-27'),
(9, 'guest', 'chibi', 'chibi', 'chibi', 'chibi', '00000000011', 'chibi@yahoo.com', NULL, 3, '2016-02-23'),
(10, 'guest', 'qweqwe', 'jess', 'bernarte', 'vista', 'qwe', 'vistajesus8@gmail.com', NULL, 3, '1990-03-31'),
(11, 'guest', 'qweqwe', 'qwe', 'qwe', 'qwe', '123', 'admin@email.com', NULL, 3, '0222-02-02');

-- --------------------------------------------------------

--
-- Table structure for table `tbluser_type`
--

CREATE TABLE IF NOT EXISTS `tbluser_type` (
  `user_type_id` int(11) NOT NULL,
  `type_name` varchar(20) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbluser_type`
--

INSERT INTO `tbluser_type` (`user_type_id`, `type_name`) VALUES
(1, 'Administrator'),
(2, 'Front-Desk'),
(3, 'Guest1'),
(5, 'sample'),
(7, 'Type sample');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_transaction`
--

CREATE TABLE IF NOT EXISTS `tbl_transaction` (
  `id` int(11) NOT NULL,
  `user_id` varchar(11) NOT NULL,
  `payment_method` varchar(200) NOT NULL,
  `transaction_id` varchar(100) NOT NULL,
  `total_amount` double(20,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tblcategory`
--
ALTER TABLE `tblcategory`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `tblproduct`
--
ALTER TABLE `tblproduct`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `tblproduct_tag`
--
ALTER TABLE `tblproduct_tag`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbltag`
--
ALTER TABLE `tbltag`
  ADD PRIMARY KEY (`tag_id`);

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
  ADD PRIMARY KEY (`user_type_id`);

--
-- Indexes for table `tbl_transaction`
--
ALTER TABLE `tbl_transaction`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tblcategory`
--
ALTER TABLE `tblcategory`
  MODIFY `category_id` int(4) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT for table `tblproduct`
--
ALTER TABLE `tblproduct`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=45;
--
-- AUTO_INCREMENT for table `tblproduct_tag`
--
ALTER TABLE `tblproduct_tag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=113;
--
-- AUTO_INCREMENT for table `tbltag`
--
ALTER TABLE `tbltag`
  MODIFY `tag_id` int(6) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=48;
--
-- AUTO_INCREMENT for table `tbluser`
--
ALTER TABLE `tbluser`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `tbluser_type`
--
ALTER TABLE `tbluser_type`
  MODIFY `user_type_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `tbl_transaction`
--
ALTER TABLE `tbl_transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
