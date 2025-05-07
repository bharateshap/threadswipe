/*
SQLyog Ultimate v11.11 (64 bit)
MySQL - 5.1.61-community : Database - ecommercee
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`ecommercee` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `ecommercee`;

/*Table structure for table `admin` */

DROP TABLE IF EXISTS `admin`;

CREATE TABLE `admin` (
  `admin_pkid` int(11) NOT NULL AUTO_INCREMENT,
  `admin_name` varchar(200) DEFAULT NULL,
  `admin_password` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`admin_pkid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `admin` */

insert  into `admin`(`admin_pkid`,`admin_name`,`admin_password`) values (1,'admin','admin');

/*Table structure for table `category` */

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `category_pkid` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`category_pkid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Data for the table `category` */

insert  into `category`(`category_pkid`,`category_name`) values (3,'Men'),(4,'Female');

/*Table structure for table `order_items` */

DROP TABLE IF EXISTS `order_items`;

CREATE TABLE `order_items` (
  `order_item_pkid` int(11) NOT NULL AUTO_INCREMENT,
  `order_fkid` int(11) DEFAULT NULL,
  `product_fkid` int(11) DEFAULT NULL,
  `product_qty` int(11) DEFAULT NULL,
  PRIMARY KEY (`order_item_pkid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `order_items` */

insert  into `order_items`(`order_item_pkid`,`order_fkid`,`product_fkid`,`product_qty`) values (1,1,1,1),(2,2,1,1),(3,2,2,2);

/*Table structure for table `orders` */

DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `order_pkid` int(11) NOT NULL AUTO_INCREMENT,
  `user_fkid` int(11) DEFAULT NULL,
  `order_date` date DEFAULT NULL,
  `account_holde_name` varchar(200) DEFAULT NULL,
  `bank_name` varchar(200) DEFAULT NULL,
  `account_no` varchar(200) DEFAULT NULL,
  `ifsc_code` varchar(200) DEFAULT NULL,
  `total_amount` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`order_pkid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `orders` */

insert  into `orders`(`order_pkid`,`user_fkid`,`order_date`,`account_holde_name`,`bank_name`,`account_no`,`ifsc_code`,`total_amount`) values (1,3,'2024-12-21','Jafar','SBI','1234567890','SBIN00321','900'),(2,3,'2024-12-23','Bharathkumar MS','SBI','873648732648723','SBIN000021','2750');

/*Table structure for table `products` */

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `product_pkid` int(11) NOT NULL AUTO_INCREMENT,
  `category_fkid` int(11) DEFAULT NULL,
  `subcategory_fkid` int(11) DEFAULT NULL,
  `product_name` varchar(200) DEFAULT NULL,
  `product_image` varchar(200) DEFAULT NULL,
  `product_size` varchar(200) DEFAULT NULL,
  `product_brand` varchar(200) DEFAULT NULL,
  `product_color` varchar(200) DEFAULT NULL,
  `product_meterial` varchar(200) DEFAULT NULL,
  `product_price` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`product_pkid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `products` */

insert  into `products`(`product_pkid`,`category_fkid`,`subcategory_fkid`,`product_name`,`product_image`,`product_size`,`product_brand`,`product_color`,`product_meterial`,`product_price`) values (1,3,1,'T Shirt','img1.jpg','XL','Zara','Red','Cotton','900'),(2,3,1,'Half Shirt','img1.jpg','XXL','Zara','Blue','Polister','950');

/*Table structure for table `subcategory` */

DROP TABLE IF EXISTS `subcategory`;

CREATE TABLE `subcategory` (
  `subcategory_pkid` int(11) NOT NULL AUTO_INCREMENT,
  `category_fkid` int(11) DEFAULT NULL,
  `subcategory_name` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`subcategory_pkid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `subcategory` */

insert  into `subcategory`(`subcategory_pkid`,`category_fkid`,`subcategory_name`) values (1,3,'Shirts');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `users_pkid` int(11) NOT NULL AUTO_INCREMENT,
  `users_name` varchar(200) DEFAULT NULL,
  `users_email` varchar(200) DEFAULT NULL,
  `users_password` varchar(200) DEFAULT NULL,
  `users_phone` varchar(200) DEFAULT NULL,
  `users_address` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`users_pkid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `users` */

insert  into `users`(`users_pkid`,`users_name`,`users_email`,`users_password`,`users_phone`,`users_address`) values (1,'Jafar','j@j.com','1234','1234567890','Mysore'),(2,'Aftab','aftab@gmail.com','1234','1234567899','Mysore'),(3,'Safan','safan@gmail.com','1234','1234567890','Mysore');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
