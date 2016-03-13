-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 13, 2016 at 12:35 PM
-- Server version: 5.6.24
-- PHP Version: 5.6.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

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
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblproduct`
--

INSERT INTO `tblproduct` (`product_id`, `product_name`, `category_id`, `description`, `quantity`, `price`, `product_image`) VALUES
(36, 'Laptop', '23', 'Wtf', 20, 12000, 'prod4.jpg'),
(37, 'Phone', '23', 'Phone na malupet', 10, 800, 'prod1.jpg'),
(38, 'Cheese cake', '20', 'boom', 19, 800, 'header.png'),
(39, 'Pasta', '20', 'masarap na pasta', 26, 12, 'pasta.jpg'),
(40, 'Burger', '20', 'burger na masarap', 45, 120, 'download.jpg'),
(41, 'Go Pro', '23', 'gopro', 10, 5000, 'gopro.jpg'),
(42, 'cell phone', '23', 'cell phone', 5, 3000, 'cp.jpg'),
(43, 'Nike Flyknit', '21', 'sneakers', 12, 5000, 'nike.jpg'),
(44, 'Apparel', '21', 'qwe', 120, 300, 'apparel.jpg'),
(46, 'Gadget with Water Mark', '21', 'watermarked', 2, 2, 'rubix.jpg'),
(47, 'sample', '21', 'ww', 3, 2, 'gadget.jpg'),
(48, 'asd', '21', '2', 0, 4, 'gadget.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `tblproduct_tag`
--

CREATE TABLE IF NOT EXISTS `tblproduct_tag` (
  `id` int(11) NOT NULL,
  `product_id` varchar(300) NOT NULL,
  `tag_id` varchar(300) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=latin1;

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
(112, '44', '47', 21),
(116, '46', '34', 21),
(117, '47', '48', 21),
(118, '48', '34', 21);

-- --------------------------------------------------------

--
-- Table structure for table `tbltag`
--

CREATE TABLE IF NOT EXISTS `tbltag` (
  `tag_id` int(6) NOT NULL,
  `tag_name` varchar(250) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=latin1;

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
(47, 'watch'),
(48, 'watermark');

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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbluser`
--

INSERT INTO `tbluser` (`userID`, `username`, `userpass`, `firstName`, `middleName`, `lastName`, `contactNo`, `email`, `address`, `userTypeID`, `birthdate`) VALUES
(1, 'admin', 'admin', 'Kim', 'Aquino', 'Aquino', '00000000000', 'admin@yahoo.com', 'malolos, bulacan', 1, '1991-05-01'),
(2, 'guest', 'guest', 'Kim', NULL, 'Aquino', '00000000001', 'kim@yahoo.com', 'makati city', 3, '1991-05-01'),
(3, 'frontdesk', 'frontdesk', 'Kim', NULL, 'Aquino', '00000000003', 'frontdesk@ymail.com', NULL, 2, '2014-09-03'),
(4, 'guest', 'VanElla', 'Kim', 'Aquino', 'Aquino', '00000000004', 'kimmy@yahoo.com', NULL, 3, '1930-10-14'),
(5, 'guest', 'guest', 'guest', 'guest', 'guest', '00000000005', 'guest@yahoo.com', NULL, 3, '1920-10-13'),
(7, 'guest', 'joyjoy', 'joy', 'Aquino', 'Aquino', '00000000007', 'joy@gmail.com', NULL, 3, '2015-10-03'),
(9, 'guest', 'chibi', 'chibi', 'chibi', 'chibi', '00000000011', 'chibi@yahoo.com', NULL, 3, '2016-02-23'),
(10, 'guest', 'qweqwe', 'jess', 'bernarte', 'vista', 'qwe', 'vistajesus8@gmail.com', NULL, 3, '1990-03-31'),
(12, 'guest', '123123123', '123', '123', '123', '123123123', 'root@email.com', NULL, 3, '0021-02-22'),
(13, 'guest', '123123', 'asd', 'asd', 'asd', '123123', 'root@email.com2', NULL, 3, '0002-02-22'),
(14, 'guest', '123123', 'qwewqe', 'qweqqwe', 'qweqwe', '123123', 'root123123@email.com', NULL, 3, '0002-02-22');

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
-- Table structure for table `tbl_orders`
--

CREATE TABLE IF NOT EXISTS `tbl_orders` (
  `id` int(5) NOT NULL,
  `order_id` varchar(50) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `product_id` varchar(50) NOT NULL,
  `price` double(20,2) NOT NULL,
  `quantity_ordered` int(50) NOT NULL,
  `subtotal` double(20,2) NOT NULL,
  `total` double(20,2) NOT NULL,
  `address` varchar(250) NOT NULL,
  `contact` varchar(250) NOT NULL,
  `date_purchased` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_orders`
--

INSERT INTO `tbl_orders` (`id`, `order_id`, `user_id`, `product_id`, `price`, `quantity_ordered`, `subtotal`, `total`, `address`, `contact`, `date_purchased`) VALUES
(1, '27', '19', '2', 250.00, 1, 250.00, 4750.00, 'zxcz', 'zxc', '2016-03-13 05:18:29'),
(2, '27', '19', '3', 4500.00, 1, 4500.00, 4750.00, 'zxcz', 'zxc', '2016-03-13 05:18:29'),
(3, '29', '23', '2', 250.00, 1, 250.00, 9250.00, 'popo', 'popo', '2016-03-13 05:29:10'),
(4, '29', '23', '3', 4500.00, 2, 9000.00, 9250.00, 'popo', 'popo', '2016-03-13 05:29:10'),
(5, '30', '24', '3', 4500.00, 1, 4500.00, 4750.00, '123', '123', '2016-03-13 05:31:10'),
(6, '30', '24', '2', 250.00, 1, 250.00, 4750.00, '123', '123', '2016-03-13 05:31:10'),
(7, '31', '25', '3', 4500.00, 1, 4500.00, 29500.00, 'sd', 'sd', '2016-03-13 05:32:36'),
(8, '31', '25', '4', 25000.00, 1, 25000.00, 29500.00, 'sd', 'sd', '2016-03-13 05:32:36'),
(9, '15', '10', '', 800.00, 19, 800.00, 0.00, 'address', 'contact', '2016-03-13 10:47:23'),
(10, '15', '10', '', 800.00, 30, 800.00, 0.00, 'address', 'contact', '2016-03-13 10:47:23'),
(11, '15', '10', '', 12.00, 31, 12.00, 0.00, 'address', 'contact', '2016-03-13 10:47:23'),
(12, '15', '10', '', 5000.00, 16, 5000.00, 0.00, 'address', 'contact', '2016-03-13 10:47:23'),
(13, '16', '10', '37', 800.00, 18, 800.00, 0.00, 'address', 'contact', '2016-03-13 10:48:03'),
(14, '16', '10', '38', 800.00, 29, 800.00, 0.00, 'address', 'contact', '2016-03-13 10:48:03'),
(15, '16', '10', '39', 12.00, 30, 12.00, 0.00, 'address', 'contact', '2016-03-13 10:48:03'),
(16, '16', '10', '41', 5000.00, 15, 5000.00, 0.00, 'address', 'contact', '2016-03-13 10:48:03'),
(17, '17', '10', '37', 800.00, 17, 800.00, 3202.00, 'address2', 'contact2', '2016-03-13 10:49:37'),
(18, '17', '10', '38', 800.00, 28, 2400.00, 3202.00, 'address2', 'contact2', '2016-03-13 10:49:37'),
(19, '17', '10', '46', 2.00, 3, 2.00, 3202.00, 'address2', 'contact2', '2016-03-13 10:49:37'),
(20, '18', '10', '36', 12000.00, 1, 12000.00, 12800.00, 'qwe', 'qwe', '2016-03-13 10:59:55'),
(21, '18', '10', '37', 800.00, 1, 800.00, 12800.00, 'qwe', 'qwe', '2016-03-13 10:59:55'),
(22, '19', '10', '37', 800.00, 1, 800.00, 5812.00, 'asd', 'asd', '2016-03-13 11:02:09'),
(23, '19', '10', '39', 12.00, 1, 12.00, 5812.00, 'asd', 'asd', '2016-03-13 11:02:09'),
(24, '19', '10', '41', 5000.00, 1, 5000.00, 5812.00, 'asd', 'asd', '2016-03-13 11:02:09'),
(25, '20', '10', '37', 800.00, 1, 800.00, 5604.00, 'qwe', 'qwe', '2016-03-13 11:03:06'),
(26, '20', '10', '38', 800.00, 6, 4800.00, 5604.00, 'qwe', 'qwe', '2016-03-13 11:03:06'),
(27, '20', '10', '48', 4.00, 1, 4.00, 5604.00, 'qwe', 'qwe', '2016-03-13 11:03:06'),
(28, '', '10', '37', 800.00, 1, 800.00, 15800.00, 'address', 'contact', '2016-03-13 12:27:18'),
(29, '', '10', '41', 5000.00, 1, 5000.00, 15800.00, 'address', 'contact', '2016-03-13 12:27:18'),
(30, '', '10', '43', 5000.00, 2, 10000.00, 15800.00, 'address', 'contact', '2016-03-13 12:27:18'),
(31, '', '10', '37', 800.00, 1, 800.00, 15800.00, 'address', 'contact', '2016-03-13 12:27:56'),
(32, '', '10', '41', 5000.00, 1, 5000.00, 15800.00, 'address', 'contact', '2016-03-13 12:27:56'),
(33, '', '10', '43', 5000.00, 2, 10000.00, 15800.00, 'address', 'contact', '2016-03-13 12:27:56'),
(34, '23', '10', '37', 800.00, 1, 800.00, 0.00, 'address123', 'contact123', '2016-03-13 12:28:36'),
(35, '23', '10', '41', 5000.00, 1, 5000.00, 0.00, 'address123', 'contact123', '2016-03-13 12:28:36'),
(36, '23', '10', '43', 5000.00, 1, 5000.00, 0.00, 'address123', 'contact123', '2016-03-13 12:28:36'),
(37, '24', '10', '36', 12000.00, 1, 12000.00, 27024.00, 'zxc', 'zxc', '2016-03-13 12:32:45'),
(38, '24', '10', '39', 12.00, 2, 24.00, 27024.00, 'zxc', 'zxc', '2016-03-13 12:32:45'),
(39, '24', '10', '43', 5000.00, 3, 15000.00, 27024.00, 'zxc', 'zxc', '2016-03-13 12:32:45');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_transaction`
--

CREATE TABLE IF NOT EXISTS `tbl_transaction` (
  `id` int(11) NOT NULL,
  `user_id` varchar(11) NOT NULL,
  `payment_method` varchar(200) NOT NULL,
  `transaction_id` varchar(100) NOT NULL,
  `total_amount` double(20,2) NOT NULL,
  `transaction_date` datetime NOT NULL,
  `shipping_address` varchar(200) NOT NULL,
  `shipping_contact_number` varchar(200) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_transaction`
--

INSERT INTO `tbl_transaction` (`id`, `user_id`, `payment_method`, `transaction_id`, `total_amount`, `transaction_date`, `shipping_address`, `shipping_contact_number`) VALUES
(1, '', '', '', 0.00, '0000-00-00 00:00:00', '', ''),
(3, '2', 'cod', '2', 0.00, '0000-00-00 00:00:00', '', ''),
(4, '2', 'cod', '2', 12800.00, '0000-00-00 00:00:00', '', ''),
(5, '2', 'cod', '5', 12800.00, '0000-00-00 00:00:00', '', ''),
(6, '2', 'cod', '6', 12800.00, '0000-00-00 00:00:00', '', ''),
(7, '2', 'cod', '7', 12800.00, '0000-00-00 00:00:00', '', ''),
(8, '2', 'cod', '8', 132.00, '2016-02-16 16:54:22', '', ''),
(9, '2', 'cod', '9', 800.00, '2016-02-16 17:42:07', '12313', '123123'),
(10, '2', 'cod', '10', 360.00, '2016-02-16 17:45:12', '', ''),
(11, '2', 'cod', '11', 800.00, '2016-02-16 17:46:17', 'qweqwe', 'qweqwe'),
(12, '2', 'cod', '11', 800.00, '2016-02-16 17:46:36', 'qweqwe', 'qweqwe'),
(13, '2', 'paypal', 'PAY-13U97779CB724525FK3EEILQ', 122.50, '2016-02-20 11:50:09', 'address', '123'),
(14, '10', 'Cash On Delivery', '14', 32800.00, '2016-03-13 09:38:07', 'address', 'contact'),
(15, '10', 'Cash On Delivery', '15', 0.00, '2016-03-13 10:47:23', 'address', 'contact'),
(16, '10', 'Cash On Delivery', '16', 0.00, '2016-03-13 10:48:03', 'address', 'contact'),
(17, '10', 'Cash On Delivery', '17', 3202.00, '2016-03-13 10:49:37', 'address2', 'contact2'),
(18, '10', 'Cash On Delivery', '18', 12800.00, '2016-03-13 10:59:55', 'qwe', 'qwe'),
(19, '10', 'Cash On Delivery', '19', 5812.00, '2016-03-13 11:02:09', 'asd', 'asd'),
(20, '10', 'Cash On Delivery', '20', 5604.00, '2016-03-13 11:03:06', 'qwe', 'qwe'),
(21, '10', 'Cash On Delivery', '21', 15800.00, '2016-03-13 12:27:18', 'address', 'contact'),
(22, '10', 'Cash On Delivery', '22', 15800.00, '2016-03-13 12:27:56', 'address', 'contact'),
(23, '10', 'Cash On Delivery', '23', 0.00, '2016-03-13 12:28:36', 'address123', 'contact123'),
(24, '10', 'Cash On Delivery', '24', 27024.00, '2016-03-13 12:32:45', 'zxc', 'zxc');

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
  ADD PRIMARY KEY (`userID`), ADD KEY `tblUser_userTypeID_FK` (`userTypeID`);

--
-- Indexes for table `tbluser_type`
--
ALTER TABLE `tbluser_type`
  ADD PRIMARY KEY (`user_type_id`);

--
-- Indexes for table `tbl_orders`
--
ALTER TABLE `tbl_orders`
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
-- AUTO_INCREMENT for table `tblcategory`
--
ALTER TABLE `tblcategory`
  MODIFY `category_id` int(4) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT for table `tblproduct`
--
ALTER TABLE `tblproduct`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=49;
--
-- AUTO_INCREMENT for table `tblproduct_tag`
--
ALTER TABLE `tblproduct_tag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=119;
--
-- AUTO_INCREMENT for table `tbltag`
--
ALTER TABLE `tbltag`
  MODIFY `tag_id` int(6) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=49;
--
-- AUTO_INCREMENT for table `tbluser`
--
ALTER TABLE `tbluser`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `tbluser_type`
--
ALTER TABLE `tbluser_type`
  MODIFY `user_type_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `tbl_orders`
--
ALTER TABLE `tbl_orders`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=40;
--
-- AUTO_INCREMENT for table `tbl_transaction`
--
ALTER TABLE `tbl_transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=25;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
