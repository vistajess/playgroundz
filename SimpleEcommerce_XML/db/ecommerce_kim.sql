-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 06, 2016 at 05:03 PM
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
  `category_name` varchar(250) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblcategory`
--

INSERT INTO `tblcategory` (`category_id`, `category_name`) VALUES
(1, '0'),
(2, '0'),
(4, 'Category 1'),
(5, 'Category 2');

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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblproduct`
--

INSERT INTO `tblproduct` (`product_id`, `product_name`, `category_id`, `description`, `quantity`, `price`, `product_image`) VALUES
(1, 'Gadget 1', '', 'Masarap na cheesecake', 120, 0, 'prod1.jpg'),
(2, 'Gadget 2', '', 'hotdog na masarap', 100, 0, 'prod2.jpg'),
(5, 'Gadget 3', '', 'Sample Description', 30, 200, 'prod4.jpg'),
(6, 'Product 5', '', 'Sample Description', 30, 200, 'prod4.jpg'),
(7, 'Product 7', '', 'Sample Description', 30, 200, 'prod5.jpg'),
(8, 'Product 8', '', 'Sample Description', 30, 200, 'prod5.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `tbltag`
--

CREATE TABLE IF NOT EXISTS `tbltag` (
  `tag_id` int(6) DEFAULT NULL,
  `tag_name` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbltag`
--

INSERT INTO `tbltag` (`tag_id`, `tag_name`) VALUES
(1, 'Tag 1'),
(2, 'Tag 2');

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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

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
(9, 'guest', 'chibi', 'chibi', 'chibi', 'chibi', '00000000011', 'chibi@yahoo.com', NULL, 3, '2016-02-23');

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
(2, 'Front-Desk'),
(3, 'Guest');

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tblcategory`
--
ALTER TABLE `tblcategory`
  MODIFY `category_id` int(4) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `tblproduct`
--
ALTER TABLE `tblproduct`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `tbluser`
--
ALTER TABLE `tbluser`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `tbluser_type`
--
ALTER TABLE `tbluser_type`
  MODIFY `userTypeID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
