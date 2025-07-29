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
-- Table structure for table `admin_app_psychometricquestion`
--

DROP TABLE IF EXISTS `admin_app_psychometricquestion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_app_psychometricquestion` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `question_text` longtext NOT NULL,
  `dimension` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_app_psychometricquestion`
--

LOCK TABLES `admin_app_psychometricquestion` WRITE;
/*!40000 ALTER TABLE `admin_app_psychometricquestion` DISABLE KEYS */;
INSERT INTO `admin_app_psychometricquestion` VALUES (1,'I prefer working alone rather than in a group.','Introversion'),(2,'I enjoy leading teams and taking charge of projects.','Leadership'),(3,'I stay calm under pressure.','Emotional Stability'),(4,'I enjoy trying new and unfamiliar things.','Openness to Experience'),(5,'I find it easy to empathize with others.','Empathy'),(6,'I like to plan things in advance rather than being spontaneous.','Conscientiousness'),(7,'I feel energized when interacting with large groups of people.','Extraversion'),(8,'I often take initiative in group settings.','Proactiveness'),(9,'I get stressed easily when things don\'t go as planned.','Stress Tolerance'),(10,'I like helping others and supporting their growth.','Altruism'),(11,'I often reflect on my emotions and how they affect others.','Self-Awareness'),(12,'I can easily adapt when plans change unexpectedly.','Adaptability'),(13,'I find joy in exploring creative ideas and thinking outside the box.','Creativity'),(14,'I value structure and organization in both my work and personal life.','Discipline'),(15,'I enjoy working on tasks that require careful attention to detail','Conscientiousness'),(16,'I feel energized when I interact with a large group of people.','Extraversion'),(17,'When working in a team, how do you usually handle conflicts?','Team Collaboration'),(18,'How do you usually approach deadlines?','Time Management'),(20,'I stay calm under pressure.','Emotional Stability'),(21,'I enjoy trying new and unfamiliar things.','Openness to Experience'),(22,'I find it easy to empathize with others.','Empathy'),(23,'I like to plan things in advance rather than being spontaneous.','Conscientiousness'),(24,'I feel energized when interacting with large groups of people.','Extraversion'),(25,'I often take initiative in group settings.','Proactiveness'),(26,'I get stressed easily when things don\'t go as planned.','Stress Tolerance'),(27,'I like helping others and supporting their growth.','Altruism'),(28,'I often reflect on my emotions and how they affect others.','Self-Awareness'),(29,'I can easily adapt when plans change unexpectedly.','Adaptability'),(30,'I find joy in exploring creative ideas and thinking outside the box.','Creativity'),(31,'I value structure and organization in both my work and personal life.','Discipline');
/*!40000 ALTER TABLE `admin_app_psychometricquestion` ENABLE KEYS */;
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
