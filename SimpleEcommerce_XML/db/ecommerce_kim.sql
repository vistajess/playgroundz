-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 27, 2016 at 06:11 AM
-- Server version: 5.6.21
-- PHP Version: 5.6.3

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
(37, 'Phone', '23', 'Phone na malupet', 2, 800, 'prod1.jpg'),
(38, 'Cheese cake', '20', 'boom', 13, 800, 'header.png'),
(39, 'Pasta', '20', 'masarap na pasta', 20, 12, 'pasta.jpg'),
(40, 'Burger', '20', 'burger na masarap', 39, 120, 'download.jpg'),
(41, 'Go Pro', '23', 'gopro', 2, 5000, 'gopro.jpg'),
(42, 'cell phone', '23', 'cell phone', 4, 3000, 'cp.jpg'),
(43, 'Nike Flyknit', '21', 'sneakers', 11, 5000, 'nike.jpg'),
(44, 'Apparel', '21', 'qwe', 119, 300, 'apparel.jpg'),
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
  `date_purchased` datetime NOT NULL,
  `status` varchar(25) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_orders`
--

INSERT INTO `tbl_orders` (`id`, `order_id`, `user_id`, `product_id`, `price`, `quantity_ordered`, `subtotal`, `total`, `address`, `contact`, `date_purchased`, `status`) VALUES
(44, '30', '10', '41', 5000.00, 1, 5000.00, 5000.00, 'QWE', 'QWE', '2016-03-19 13:38:48', 'paid'),
(47, '31', '10', '40', 120.00, 3, 360.00, 360.00, 'qwe', 'qwe', '2016-03-19 13:43:01', 'paid'),
(48, '32', '10', '39', 12.00, 1, 12.00, 12.00, 'BAGONG ORDER', 'BAGONG ORDER', '2016-03-19 13:57:13', 'cancelled'),
(49, '33', '10', '36', 12000.00, 1, 12000.00, 18720.00, '5 Different Items', '5 Different Items', '2016-03-19 14:17:40', 'pending'),
(50, '33', '10', '37', 800.00, 1, 800.00, 18720.00, '5 Different Items', '5 Different Items', '2016-03-19 14:17:40', 'pending'),
(51, '33', '10', '38', 800.00, 1, 800.00, 18720.00, '5 Different Items', '5 Different Items', '2016-03-19 14:17:40', 'pending'),
(52, '33', '10', '40', 120.00, 1, 120.00, 18720.00, '5 Different Items', '5 Different Items', '2016-03-19 14:17:40', 'pending'),
(53, '33', '10', '41', 5000.00, 1, 5000.00, 18720.00, '5 Different Items', '5 Different Items', '2016-03-19 14:17:40', 'pending'),
(54, '34', '10', '36', 12000.00, 1, 12000.00, 12000.00, '', '', '2016-03-19 14:18:53', 'pending'),
(55, '35', '10', '37', 800.00, 1, 800.00, 6732.00, '5 Items', '5 Items', '2016-03-19 14:20:15', 'pending'),
(56, '35', '10', '38', 800.00, 1, 800.00, 6732.00, '5 Items', '5 Items', '2016-03-19 14:20:15', 'pending'),
(57, '35', '10', '39', 12.00, 1, 12.00, 6732.00, '5 Items', '5 Items', '2016-03-19 14:20:15', 'pending'),
(58, '35', '10', '40', 120.00, 1, 120.00, 6732.00, '5 Items', '5 Items', '2016-03-19 14:20:15', 'pending'),
(59, '35', '10', '41', 5000.00, 1, 5000.00, 6732.00, '5 Items', '5 Items', '2016-03-19 14:20:15', 'pending'),
(60, '36', '10', '38', 800.00, 1, 800.00, 5812.00, 'New', 'New', '2016-03-19 14:24:01', 'pending'),
(61, '36', '10', '39', 12.00, 1, 12.00, 5812.00, 'New', 'New', '2016-03-19 14:24:01', 'pending'),
(62, '36', '10', '43', 5000.00, 1, 5000.00, 5812.00, 'New', 'New', '2016-03-19 14:24:01', 'pending'),
(63, '37', '10', '39', 12.00, 1, 12.00, 8132.00, 'asd', 'asd', '2016-03-19 14:31:39', 'pending'),
(64, '37', '10', '40', 120.00, 1, 120.00, 8132.00, 'asd', 'asd', '2016-03-19 14:31:39', 'pending'),
(65, '37', '10', '41', 5000.00, 1, 5000.00, 8132.00, 'asd', 'asd', '2016-03-19 14:31:39', 'pending'),
(66, '37', '10', '42', 3000.00, 1, 3000.00, 8132.00, 'asd', 'asd', '2016-03-19 14:31:39', 'pending'),
(67, '38', '13', '38', 800.00, 1, 800.00, 800.00, 'Shipping address', 'contact', '2016-03-27 06:05:01', 'pending');

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
  `shipping_contact_number` varchar(200) NOT NULL,
  `status` varchar(25) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_transaction`
--

INSERT INTO `tbl_transaction` (`id`, `user_id`, `payment_method`, `transaction_id`, `total_amount`, `transaction_date`, `shipping_address`, `shipping_contact_number`, `status`) VALUES
(1, '', '', '', 0.00, '0000-00-00 00:00:00', '', '', 'pending'),
(3, '2', 'cod', '2', 0.00, '0000-00-00 00:00:00', '', '', 'pending'),
(4, '2', 'cod', '2', 12800.00, '0000-00-00 00:00:00', '', '', 'pending'),
(5, '2', 'cod', '5', 12800.00, '0000-00-00 00:00:00', '', '', 'pending'),
(6, '2', 'cod', '6', 12800.00, '0000-00-00 00:00:00', '', '', 'pending'),
(7, '2', 'cod', '7', 12800.00, '0000-00-00 00:00:00', '', '', 'pending'),
(8, '2', 'cod', '8', 132.00, '2016-02-16 16:54:22', '', '', 'pending'),
(9, '2', 'cod', '9', 800.00, '2016-02-16 17:42:07', '12313', '123123', 'pending'),
(10, '2', 'cod', '10', 360.00, '2016-02-16 17:45:12', '', '', 'pending'),
(11, '2', 'cod', '11', 800.00, '2016-02-16 17:46:17', 'qweqwe', 'qweqwe', 'pending'),
(12, '2', 'cod', '11', 800.00, '2016-02-16 17:46:36', 'qweqwe', 'qweqwe', 'pending'),
(13, '2', 'paypal', 'PAY-13U97779CB724525FK3EEILQ', 122.50, '2016-02-20 11:50:09', 'address', '123', 'pending'),
(14, '10', 'Cash On Delivery', '14', 32800.00, '2016-03-13 09:38:07', 'address', 'contact', 'pending'),
(17, '10', 'Cash On Delivery', '17', 3202.00, '2016-03-13 10:49:37', 'address2', 'contact2', 'pending'),
(19, '10', 'Cash On Delivery', '19', 5812.00, '2016-03-13 11:02:09', 'asd', 'asd', 'pending'),
(20, '10', 'Cash On Delivery', '20', 5604.00, '2016-03-13 11:03:06', 'qwe', 'qwe', 'pending'),
(21, '10', 'Cash On Delivery', '21', 15800.00, '2016-03-13 12:27:18', 'address', 'contact', 'pending'),
(22, '10', 'Cash On Delivery', '22', 15800.00, '2016-03-13 12:27:56', 'address', 'contact', 'pending'),
(23, '10', 'Cash On Delivery', '23', 0.00, '2016-03-13 12:28:36', 'address123', 'contact123', 'pending'),
(24, '10', 'Cash On Delivery', '24', 27024.00, '2016-03-13 12:32:45', 'zxc', 'zxc', 'pending'),
(26, '10', 'Cash On Delivery', '25', 1600.00, '2016-03-19 13:28:57', 'sample', 'contact', 'pending'),
(27, '10', 'Cash On Delivery', '27', 36800.00, '2016-03-19 13:29:47', 'QWEQWE', 'QWEQWE', 'pending'),
(28, '10', 'Cash On Delivery', '28', 1900.00, '2016-03-19 13:31:31', 'Shipping Address', 'Contact Number', 'pending'),
(29, '10', 'Cash On Delivery', '29', 24.00, '2016-03-19 13:33:31', 'asd', 'asd', 'pending'),
(30, '10', 'Cash On Delivery', '30', 0.00, '2016-03-19 13:39:31', 'ASD', 'AASDADS', 'paid'),
(31, '10', 'Cash On Delivery', '31', 360.00, '2016-03-19 13:43:01', 'qwe', 'qwe', 'paid'),
(32, '10', 'Cash On Delivery', '32', 12.00, '2016-03-19 13:57:13', 'BAGONG ORDER', 'BAGONG ORDER', 'cancelled'),
(33, '10', 'Cash On Delivery', '33', 18720.00, '2016-03-19 14:17:40', '5 Different Items', '5 Different Items', 'pending'),
(34, '10', 'Cash On Delivery', '34', 12000.00, '2016-03-19 14:18:53', '', '', 'pending'),
(35, '10', 'Cash On Delivery', '35', 6732.00, '2016-03-19 14:20:15', '5 Items', '5 Items', 'pending'),
(36, '10', 'Cash On Delivery', '36', 5812.00, '2016-03-19 14:24:01', 'New', 'New', 'pending'),
(37, '10', 'Cash On Delivery', '37', 8132.00, '2016-03-19 14:31:39', 'asd', 'asd', 'pending'),
(38, '13', 'Cash On Delivery', '38', 800.00, '2016-03-27 06:05:01', 'Shipping address', 'contact', 'pending');

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
MODIFY `id` int(5) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=68;
--
-- AUTO_INCREMENT for table `tbl_transaction`
--
ALTER TABLE `tbl_transaction`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=39;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
