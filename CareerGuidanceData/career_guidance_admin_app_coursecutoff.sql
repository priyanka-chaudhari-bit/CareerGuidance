-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: career_guidance
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin_app_coursecutoff`
--

DROP TABLE IF EXISTS `admin_app_coursecutoff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_app_coursecutoff` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `category` varchar(50) NOT NULL,
  `cutoff_score` double NOT NULL,
  `college_course_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `admin_app_coursecutoff_college_course_id_category_1179f7c1_uniq` (`college_course_id`,`category`),
  CONSTRAINT `admin_app_coursecuto_college_course_id_cec1cb2b_fk_admin_app` FOREIGN KEY (`college_course_id`) REFERENCES `admin_app_collegecourse` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=140 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_app_coursecutoff`
--

LOCK TABLES `admin_app_coursecutoff` WRITE;
/*!40000 ALTER TABLE `admin_app_coursecutoff` DISABLE KEYS */;
INSERT INTO `admin_app_coursecutoff` VALUES (1,'General',93.23,1),(2,'SC',60,1),(3,'ST',46.6,1),(4,'EWS',81.3,1),(5,'OBCNCL',79.6,1),(6,'General',845,2),(7,'OBCNCL',708,2),(8,'SC',603,2),(9,'ST',498,2),(10,'EWS',747,2),(11,'OBCNCL',81,3),(12,'SC',60,3),(13,'ST',60,3),(14,'EWS',60,3),(15,'General',14,22),(16,'OBCNCL',14,22),(17,'SC',5,22),(18,'ST',3,22),(19,'EWS',4,22),(20,'General',75.6,23),(21,'OBCNCL',67.2,23),(22,'SC',55.3,23),(23,'ST',50.8,23),(24,'EWS',70.1,23),(25,'General',1191,24),(26,'OBCNCL',2761,24),(27,'SC',2807,24),(28,'ST',1265,24),(29,'General',32,25),(30,'EWS',2000,24),(31,'OBCNCL',27,25),(32,'SC',20,25),(33,'ST',18,25),(34,'EWS',29,25),(35,'General',47,4),(36,'OBCNCL',186,4),(37,'SC',647,4),(38,'ST',1150,4),(39,'EWS',214,4),(40,'General',28528,5),(41,'OBCNCL',24193,5),(42,'SC',17825,5),(43,'ST',24177,5),(44,'EWS',5652,5),(45,'General',444,19),(46,'OBCNCL',1697,19),(47,'SC',6162,19),(48,'ST',4082,19),(49,'EWS',666,19),(50,'General',52,20),(51,'OBCNCL',165,20),(52,'SC',153,20),(53,'ST',455,20),(54,'EWS',199,20),(55,'General',141,21),(56,'OBC',660,21),(57,'SC',1057,21),(58,'ST',2806,21),(59,'EWS',667,21),(60,'General',85,6),(61,'OBCNCL',75,6),(62,'SC',70,6),(63,'ST',65,6),(64,'EWS',75,6),(65,'General',22300,7),(66,'OBCNCL',26000,7),(67,'SC',31000,7),(68,'ST',36000,7),(69,'EWS',24000,7),(70,'General',600,8),(71,'OBCNCL',500,8),(72,'SC',450,8),(73,'ST',400,8),(74,'EWS',520,8),(75,'General',60,9),(76,'OBCNCL',55,9),(77,'SC',50,9),(78,'ST',45,9),(79,'EWS',58,9),(80,'General',85,10),(81,'OBCNCL',80,10),(82,'SC',78,10),(83,'ST',75,10),(84,'EWS',81,10),(86,'General',81,11),(87,'OBCNCL',79,11),(88,'SC',75,11),(89,'ST',74,11),(90,'EWS',77,11),(91,'General',85,12),(92,'OBCNCL',80,12),(93,'SC',75,12),(94,'ST',70,12),(95,'EWS',72,12),(96,'General',10000,13),(97,'OBCNCL',12000,13),(98,'SC',15000,13),(99,'ST',18000,13),(100,'EWS',14000,13),(101,'General',20000,14),(102,'OBCNCL',22000,14),(103,'SC',25000,14),(104,'ST',28000,14),(105,'EWS',27000,14),(106,'General',60,15),(107,'OBCNCL',55,15),(108,'SC',50,15),(109,'ST',45,15),(110,'EWS',58,15),(111,'General',55,16),(112,'OBCNCL',50,16),(113,'SC',45,16),(114,'ST',40,16),(115,'EWS',53,16),(116,'General',400,17),(117,'OBCNCL',380,17),(118,'SC',350,17),(119,'ST',320,17),(120,'EWS',390,17),(121,'General',420,18),(122,'OBCNCL',400,18),(123,'SC',380,18),(124,'ST',350,18),(125,'EWS',390,18),(126,'General',500,26),(127,'OBCNCL',700,26),(128,'SC',900,26),(129,'ST',1100,26),(130,'EWS',600,26),(131,'General',50,27),(132,'OBCNCL',45,27),(133,'SC',40,27),(134,'ST',35,27),(135,'EWS',48,27);
/*!40000 ALTER TABLE `admin_app_coursecutoff` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-29 22:14:27
