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
-- Table structure for table `admin_app_psychometricresult`
--

DROP TABLE IF EXISTS `admin_app_psychometricresult`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_app_psychometricresult` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `personality_type` varchar(50) NOT NULL,
  `interests` longtext NOT NULL,
  `recommended_fields` longtext NOT NULL,
  `alignment_score` double DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `admin_app_psychometr_user_id_6c19d7e4_fk_students_` FOREIGN KEY (`user_id`) REFERENCES `students_customuser` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_app_psychometricresult`
--

LOCK TABLES `admin_app_psychometricresult` WRITE;
/*!40000 ALTER TABLE `admin_app_psychometricresult` DISABLE KEYS */;
INSERT INTO `admin_app_psychometricresult` VALUES (1,'Leadership','Law, Medical, Education, Design, Engineering','Medical, Education, Law',NULL,'2025-07-28 19:52:31.699503',15),(2,'Leadership','Education, Management, Engineering, Law, Hotel Management','Education, Management, Medical',NULL,'2025-06-05 15:43:58.015781',22),(3,'Leadership','Medical, Education, Design, Law, Management','Medical, Education, Design',NULL,'2025-06-05 21:35:16.610167',24),(4,'Unknown','','Engineering, Management, Computer Applications',NULL,'2025-07-28 10:56:35.756114',25),(5,'Unknown','','Engineering, Management, Computer Applications',NULL,'2025-07-28 11:05:39.643154',26),(6,'Conscientiousness','Education, Management, Law, Medical, Engineering','Education, Management, Medical',NULL,'2025-07-29 13:47:53.924620',27);
/*!40000 ALTER TABLE `admin_app_psychometricresult` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-29 22:14:26
