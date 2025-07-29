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
-- Table structure for table `admin_app_psychometricoption`
--

DROP TABLE IF EXISTS `admin_app_psychometricoption`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_app_psychometricoption` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `option_text` varchar(255) NOT NULL,
  `weight` int NOT NULL,
  `question_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_app_psychometr_question_id_9fa28f77_fk_admin_app` (`question_id`),
  CONSTRAINT `admin_app_psychometr_question_id_9fa28f77_fk_admin_app` FOREIGN KEY (`question_id`) REFERENCES `admin_app_psychometricquestion` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=211 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_app_psychometricoption`
--

LOCK TABLES `admin_app_psychometricoption` WRITE;
/*!40000 ALTER TABLE `admin_app_psychometricoption` DISABLE KEYS */;
INSERT INTO `admin_app_psychometricoption` VALUES (1,'Strongly Disagree',1,1),(2,'Disagree',2,1),(3,'Neutral',3,1),(4,'Agree',4,1),(5,'Strongly Agree',5,1),(6,'Strongly Disagree',1,2),(7,'Disagree',2,2),(8,'Neutral',3,2),(9,'Agree',4,2),(10,'Strongly Agree',5,2),(11,'Strongly Disagree',1,3),(12,'Disagree',2,3),(13,'Neutral',3,3),(14,'Agree',4,3),(15,'Strongly Agree',5,3),(16,'Strongly Disagree',1,4),(17,'Disagree',2,4),(18,'Neutral',3,4),(19,'Agree',4,4),(20,'Strongly Agree',5,4),(21,'Strongly Disagree',1,5),(22,'Disagree',2,5),(23,'Neutral',3,5),(24,'Agree',4,5),(25,'Strongly Agree',5,5),(26,'Strongly Disagree',1,6),(27,'Disagree',2,6),(28,'Neutral',3,6),(29,'Agree',4,6),(30,'Strongly Agree',5,6),(31,'Strongly Disagree',1,7),(32,'Disagree',2,7),(33,'Neutral',3,7),(34,'Agree',4,7),(35,'Strongly Agree',5,7),(36,'Strongly Disagree',1,8),(37,'Disagree',2,8),(38,'Neutral',3,8),(39,'Agree',4,8),(40,'Strongly Agree',5,8),(41,'Strongly Disagree',5,9),(42,'Disagree',4,9),(43,'Neutral',3,9),(44,'Agree',2,9),(45,'Strongly Agree',1,9),(46,'Strongly Disagree',1,10),(47,'Disagree',2,10),(48,'Neutral',3,10),(49,'Agree',4,10),(50,'Strongly Agree',5,10),(51,'Strongly Disagree',1,11),(52,'Disagree',2,11),(53,'Neutral',3,11),(54,'Agree',4,11),(55,'Strongly Agree',5,11),(56,'Strongly Disagree',1,12),(57,'Disagree',2,12),(58,'Neutral',3,12),(59,'Agree',4,12),(60,'Strongly Agree',5,12),(61,'Strongly Disagree',1,13),(62,'Disagree',2,13),(63,'Neutral',3,13),(64,'Agree',4,13),(65,'Strongly Agree',5,13),(66,'Strongly Disagree',1,14),(67,'Disagree',2,14),(68,'Neutral',3,14),(69,'Agree',4,14),(70,'Strongly Agree',5,14),(71,'Strongly Disagree',1,15),(72,'Disagree',2,15),(73,'Neutral',3,15),(74,'Agree',4,15),(75,'Strongly Agree',5,15),(76,'Strongly Disagree',1,16),(77,'Disagree',2,16),(78,'Neutral',3,16),(79,'Agree',4,16),(80,'Strongly Agree',5,16),(81,'I avoid the conflict and let others handle it',1,17),(82,'I assert my point strongly, even if it causes friction.',2,17),(83,'I focus on getting the task done, even if some members are unhappy',3,17),(84,'I try to find a compromise to keep the team moving.',4,17),(85,'I try to mediate and ensure everyone’s opinion is heard.',5,17),(86,'I often procrastinate and complete tasks at the last minute.',1,18),(87,'I sometimes delay work but manage to finish on time.',2,18),(88,'I try to stick to the schedule but occasionally slip.',3,18),(89,'I plan ahead and finish slightly before the deadline.',4,18),(90,'I set personal deadlines well in advance to stay ahead.',5,18),(96,'Strongly Disagree',1,20),(97,'Disagree',2,20),(98,'Neutral',3,20),(99,'Agree',4,20),(100,'Strongly Agree',5,20),(101,'Strongly Disagree',1,21),(102,'Disagree',2,21),(103,'Neutral',3,21),(104,'Agree',4,21),(105,'Strongly Agree',5,21),(106,'Strongly Disagree',1,22),(107,'Disagree',2,22),(108,'Neutral',3,22),(109,'Agree',4,22),(110,'Strongly Agree',5,22),(111,'Strongly Disagree',1,23),(112,'Disagree',2,23),(113,'Neutral',3,23),(114,'Agree',4,23),(115,'Strongly Agree',5,23),(116,'Strongly Disagree',1,24),(117,'Disagree',2,24),(118,'Neutral',3,24),(119,'Agree',4,24),(120,'Strongly Agree',5,24),(121,'Strongly Disagree',1,25),(122,'Disagree',2,25),(123,'Neutral',3,25),(124,'Agree',4,25),(125,'Strongly Agree',5,25),(126,'Strongly Disagree',5,26),(127,'Disagree',4,26),(128,'Neutral',3,26),(129,'Agree',2,26),(130,'Strongly Agree',1,26),(131,'Strongly Disagree',1,27),(132,'Disagree',2,27),(133,'Neutral',3,27),(134,'Agree',4,27),(135,'Strongly Agree',5,27),(136,'Strongly Disagree',1,28),(137,'Disagree',2,28),(138,'Neutral',3,28),(139,'Agree',4,28),(140,'Strongly Agree',5,28),(141,'Strongly Disagree',1,29),(142,'Disagree',2,29),(143,'Neutral',3,29),(144,'Agree',4,29),(145,'Strongly Agree',5,29),(146,'Strongly Disagree',1,30),(147,'Disagree',2,30),(148,'Neutral',3,30),(149,'Agree',4,30),(150,'Strongly Agree',5,30),(151,'Strongly Disagree',1,31),(152,'Disagree',2,31),(153,'Neutral',3,31),(154,'Agree',4,31),(155,'Strongly Agree',5,31);
/*!40000 ALTER TABLE `admin_app_psychometricoption` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-29 22:14:30
