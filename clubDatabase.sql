-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: clubDatabase
-- ------------------------------------------------------
-- Server version	8.0.32-0ubuntu0.22.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ClubAdmins`
--

DROP TABLE IF EXISTS `ClubAdmins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ClubAdmins` (
  `MembershipID` int NOT NULL AUTO_INCREMENT,
  `UserID` int DEFAULT NULL,
  `ClubName` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`MembershipID`),
  KEY `UserID` (`UserID`),
  KEY `ClubName` (`ClubName`),
  CONSTRAINT `ClubAdmins_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`),
  CONSTRAINT `ClubAdmins_ibfk_2` FOREIGN KEY (`ClubName`) REFERENCES `Clubs` (`ClubName`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ClubAdmins`
--

LOCK TABLES `ClubAdmins` WRITE;
/*!40000 ALTER TABLE `ClubAdmins` DISABLE KEYS */;
INSERT INTO `ClubAdmins` VALUES (1,1811255,'Soccer Club'),(2,1812345,'Debating Club'),(3,1812346,'Volleyball Club'),(4,1234569,'Jousting Club'),(5,1234568,'Super Natural Club');
/*!40000 ALTER TABLE `ClubAdmins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ClubMembers`
--

DROP TABLE IF EXISTS `ClubMembers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ClubMembers` (
  `UserID` int DEFAULT NULL,
  `ClubName` varchar(30) DEFAULT NULL,
  `ClubMembershipID` int NOT NULL AUTO_INCREMENT,
  `PostNotifications` tinyint(1) DEFAULT '0',
  `EventNotifications` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`ClubMembershipID`),
  KEY `UserID` (`UserID`),
  KEY `ClubName` (`ClubName`),
  CONSTRAINT `ClubMembers_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`),
  CONSTRAINT `ClubMembers_ibfk_2` FOREIGN KEY (`ClubName`) REFERENCES `Clubs` (`ClubName`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ClubMembers`
--

LOCK TABLES `ClubMembers` WRITE;
/*!40000 ALTER TABLE `ClubMembers` DISABLE KEYS */;
INSERT INTO `ClubMembers` VALUES (1811255,'Volleyball Club',1,0,0),(1234560,'Debating Club',5,0,0),(1234567,'Soccer Club',6,0,0),(1234568,'Debating Club',7,0,0),(1234569,'Soccer Club',8,0,0),(1812346,'Volleyball Club',9,0,0),(1811255,'Soccer Club',11,0,0),(1812345,'Debating Club',21,0,0),(1812345,'Soccer Club',22,0,0),(1812345,'Volleyball Club',23,0,0),(1234569,'Jousting Club',28,0,0),(1234568,'Super Natural Club',29,0,0),(1812345,'Super Natural Club',30,0,0),(1812345,'Jousting Club',31,0,0),(1812346,'Jousting Club',32,0,0),(1812346,'Super Natural Club',33,0,0);
/*!40000 ALTER TABLE `ClubMembers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Clubs`
--

DROP TABLE IF EXISTS `Clubs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Clubs` (
  `ClubName` varchar(30) NOT NULL,
  `ClubOwner` int DEFAULT NULL,
  PRIMARY KEY (`ClubName`),
  KEY `ClubOwner` (`ClubOwner`),
  CONSTRAINT `Clubs_ibfk_1` FOREIGN KEY (`ClubOwner`) REFERENCES `Users` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Clubs`
--

LOCK TABLES `Clubs` WRITE;
/*!40000 ALTER TABLE `Clubs` DISABLE KEYS */;
INSERT INTO `Clubs` VALUES ('Volleyball Club',1234560),('Super Natural Club',1234568),('Jousting Club',1234569),('Debating Club',1812345),('Soccer Club',1812346);
/*!40000 ALTER TABLE `Clubs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Event`
--

DROP TABLE IF EXISTS `Event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Event` (
  `EventID` int NOT NULL AUTO_INCREMENT,
  `EventName` varchar(100) DEFAULT NULL,
  `EventDescription` varchar(300) DEFAULT NULL,
  `EventDate` datetime DEFAULT NULL,
  `Location` varchar(200) DEFAULT NULL,
  `ClubName` varchar(30) DEFAULT NULL,
  `public` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`EventID`),
  KEY `ClubName` (`ClubName`),
  CONSTRAINT `Event_ibfk_1` FOREIGN KEY (`ClubName`) REFERENCES `Clubs` (`ClubName`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Event`
--

LOCK TABLES `Event` WRITE;
/*!40000 ALTER TABLE `Event` DISABLE KEYS */;
INSERT INTO `Event` VALUES (1,'Soccer Club Meetup!','Hey guys, we are meeting up next Monday at the usual practice field. Big announcement being made there so don\'t miss out!','2023-06-12 13:00:00','University Soccer Field','Soccer Club',0),(2,'Uniform Pickup','Uniform pickup for new members will be available on the second floor of the Gynasium 1 on Monday.','2023-06-12 10:00:00','Gymnasium 1','Soccer Club',0),(4,'Debate Club - Bake Sale!','Just a reminder for everyone. Our regular meeting tomorrow will be held in the courtyard where we will be hosting a bake sale.','2023-02-12 11:00:00','University Courtyard','Debating Club',1),(5,'Debate Club - Regionals Bus!','We will be meeting up on 04/07/2023 infront of the Library to catch the bus to go to regionals','2023-07-04 14:00:00','University Library','Debating Club',0),(6,'Volleyball Club - Tryouts','Tryouts for the new members will be taking place this coming Friday','2023-06-08 15:00:00','Gymnasium 2','Volleyball Club',1),(7,'Volleyball Club - Thursday Practice','Thursday practice has been rescheduled from our regular 4pm to 5pm due to a scheduling error with the Basketball club.','2023-06-08 14:30:00','Gymnasium 1','Volleyball Club',0),(8,'Jousting Club - Tournament Tuesdays!','As most of you know, Tuesday is our mandatory practice. During these tournaments we will be using real horses and weaponry so be prepared for a few bumps and bruises! Please bring medical insurance','2023-06-20 13:00:00','University Colosseum','Jousting Club',0),(9,'Jousting Club - Horse Wrangling Mondays','We will be going out into the wild to wrangle some horses for the stables. As most of you are aware we lost a few horses during our last Tournament Tuesday.','2023-06-19 07:00:00','Some Random Field','Jousting Club',0),(10,'SuperNatural Club - Ghost Hunting','Ghost hunting this week will take place in the University Cemetary. Please bring adult diapers','2023-06-09 00:00:00','University Cemetary','Super Natural Club',0),(11,'SuperNatural Club - UFO Watching','Tonight we will be contacting our friends from space. Make sure to be on your best behaviour. We do not want to be responsible for a hostile invasion','2023-06-08 01:00:00','University Observatory','Super Natural Club',0);
/*!40000 ALTER TABLE `Event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EventMembers`
--

DROP TABLE IF EXISTS `EventMembers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EventMembers` (
  `EventMemberID` int NOT NULL AUTO_INCREMENT,
  `EventID` int DEFAULT NULL,
  `UserID` int DEFAULT NULL,
  PRIMARY KEY (`EventMemberID`),
  KEY `EventID` (`EventID`),
  KEY `UserID` (`UserID`),
  CONSTRAINT `EventMembers_ibfk_1` FOREIGN KEY (`EventID`) REFERENCES `Event` (`EventID`),
  CONSTRAINT `EventMembers_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EventMembers`
--

LOCK TABLES `EventMembers` WRITE;
/*!40000 ALTER TABLE `EventMembers` DISABLE KEYS */;
INSERT INTO `EventMembers` VALUES (1,1,1811255),(2,1,1234567),(4,4,1812345),(5,4,1234568),(7,5,1234560),(8,5,1234568),(9,6,1811255),(10,2,1234567),(11,7,1812345),(12,7,1812346),(23,8,1812345),(24,8,1234569),(25,8,1812346),(26,9,1812346),(27,9,1234569),(28,9,1812345),(29,10,1812345),(30,10,1234568),(31,11,1234568),(32,11,1812346),(33,11,1812345);
/*!40000 ALTER TABLE `EventMembers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Posts`
--

DROP TABLE IF EXISTS `Posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Posts` (
  `PostID` int NOT NULL AUTO_INCREMENT,
  `PostTitle` varchar(55) DEFAULT NULL,
  `PostText` varchar(2000) DEFAULT NULL,
  `PostDate` datetime DEFAULT NULL,
  `ClubName` varchar(30) DEFAULT NULL,
  `public` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`PostID`),
  KEY `ClubName` (`ClubName`),
  CONSTRAINT `Posts_ibfk_1` FOREIGN KEY (`ClubName`) REFERENCES `Clubs` (`ClubName`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Posts`
--

LOCK TABLES `Posts` WRITE;
/*!40000 ALTER TABLE `Posts` DISABLE KEYS */;
INSERT INTO `Posts` VALUES (1,'Test post Title','Test post content text here','2023-06-05 05:39:20',NULL,0),(2,'Second test post Title','Second Test post content text here','2023-06-05 05:43:17',NULL,0),(3,'Practice on Thursday','Just letting yall know that practice is cancelled on thursday!','2023-06-05 12:40:25','Soccer Club',0),(4,'Bring Equipment','For any new members please be advised that you should bring your own equipment to the tryouts','2023-06-06 05:31:50','Volleyball Club',1),(5,'Policy Update','We have decided to allow drinks in during our debate practices. Please only bring bottled drinks though!','2023-06-06 05:33:24','Debating Club',0),(6,'Socks','Thigh socks will no longer be permitted during practice or tournaments. Please wear use socks provided with our uniforms','2023-06-09 10:00:43','Soccer Club',0),(7,'Beach Trip','Trying to gauge interest on a trip to the beach. Please email me if you guys are would like me to set this up.','2023-06-09 10:02:33','Volleyball Club',0),(8,'Practice Room','Please be aware that our regular practice room is under construction. I will make another post regarding what will happen for our next meeting','2023-06-09 10:03:46','Debating Club',0),(9,'Sharper Weapons','Sharpen your weapons weekly. We actually want to see some injuries during our next tournament.','2023-06-09 10:04:47','Jousting Club',0),(10,'Shields Policy Update','Shields are no longer permitted due to the number of members using them to hide behind. If you need to block a hit, use your face.','2023-06-09 10:06:24','Jousting Club',0);
/*!40000 ALTER TABLE `Posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `UserID` int NOT NULL,
  `GivenName` varchar(30) DEFAULT NULL,
  `Surname` varchar(30) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `password` varchar(21) DEFAULT NULL,
  `username` varchar(30) DEFAULT NULL,
  `AdminStatus` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (0,'Ad','Min','1@1.com','admin','admin1',1),(1234560,'Carl','Blue','carlblue@gmail.com','123','carlblue',0),(1234567,'Reg','Guy','regguy@gmail.com','123','regguy',0),(1234568,'Eve','Green','evegreen@gmail.com','123','evegreen',0),(1234569,'John','Red','johnblack@gmail.com','123','johnred',0),(1811255,'Aaron','Long','aaronlong@gmail.com','password123','usernamehere',0),(1812345,'Bobby','Brown','BBrown@gmail.com','12345','bobbybrown',0),(1812346,'Carla','Carlile','CarlaCarlile@gmail.com','mypassword','carlacarlile',0);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-09 12:02:04
