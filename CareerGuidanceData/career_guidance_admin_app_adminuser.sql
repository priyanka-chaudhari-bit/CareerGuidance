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
-- Table structure for table `admin_app_adminuser`
--

DROP TABLE IF EXISTS `admin_app_adminuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_app_adminuser` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `admin_app_a_email_d14e39_idx` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_app_adminuser`
--

LOCK TABLES `admin_app_adminuser` WRITE;
/*!40000 ALTER TABLE `admin_app_adminuser` DISABLE KEYS */;
INSERT INTO `admin_app_adminuser` VALUES (1,'pbkdf2_sha256$720000$aRthrIhroDFo7atmN96Z03$gEEP7PI30/i3dvB6cmteaLMNlSX0kMpMAFczbYl68zw=',NULL,0,'admin6','','','some2@test.com',0,1,'2025-03-29 10:24:39.179993',1),(2,'pbkdf2_sha256$720000$87y5QUCywvWaFeloYqTKfg$NFmIm+LIH0D01BSqvWYGVIClTYyrk9Tw52vt/KnywdQ=',NULL,0,'admin7','','','some2@test.com',0,1,'2025-05-04 14:47:32.803365',1),(3,'pbkdf2_sha256$720000$ozT6C9Nzr5BWUO7ROft18a$0Tmt/3/aJBCABZvzcxKj/By1XKevNz/ofBRuKJqHEUY=',NULL,0,'admin5','','','some2@test.com',0,1,'2025-07-24 14:58:47.110922',1),(4,'pbkdf2_sha256$720000$Mygusm2nE3qcNnw63htXHd$YOvygamjChv0/bg6zWFHu/rFuafTAvLtI1Orxlxo1Ck=',NULL,0,'admin12','','','some3@test.com',0,1,'2025-07-24 15:19:57.304082',1),(5,'pbkdf2_sha256$720000$p529VBJsEV5xQJeSS2f2tb$zQNv+oMWzuTfKN0a2F5dltR+xU5keL6VoSjjqyu7RdA=',NULL,0,'admin13','','','some4@test.com',0,1,'2025-07-24 17:29:55.519498',1),(6,'pbkdf2_sha256$720000$yjN6AZY8iTRPRxNLRPRy5i$VCemuZ3CabwK06f8Wi+Y8wNGbVHjJdGLqWOvmuWv6Fo=',NULL,0,'admin14','','','some5@test.com',0,1,'2025-07-24 17:34:01.372665',1);
/*!40000 ALTER TABLE `admin_app_adminuser` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-29 22:14:28
