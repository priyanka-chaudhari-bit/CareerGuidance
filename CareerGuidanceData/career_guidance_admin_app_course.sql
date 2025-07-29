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
-- Table structure for table `admin_app_course`
--

DROP TABLE IF EXISTS `admin_app_course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_app_course` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `course_type` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_app_course`
--

LOCK TABLES `admin_app_course` WRITE;
/*!40000 ALTER TABLE `admin_app_course` DISABLE KEYS */;
INSERT INTO `admin_app_course` VALUES (1,'B.Sc Agriculture','Agriculture'),(2,'M.Sc Agriculture','Agriculture'),(3,'B.A in Animation','Animation'),(4,'B.Arch','Architecture'),(5,'M.Arch','Architecture'),(6,'B.A','Arts'),(7,'M.A','Arts'),(8,'BFA','Arts'),(9,'B.Sc Aviation','Aviation'),(10,'B.Com','Commerce'),(11,'M.Com','Commerce'),(12,'BCA','Computer Applications'),(13,'MCA','Computer Applications'),(14,'BDS','Dental'),(15,'MDS','Dental'),(16,'B.Des','Design'),(17,'M.Des','Design'),(18,'B.Ed','Education'),(19,'M.Ed','Education'),(20,'B.Tech','Engineering'),(21,'M.Tech','Engineering'),(22,'M.E','Engineering'),(23,'B.E','Engineering'),(24,'BHM','Hotel Management'),(25,'LLB','Law'),(26,'LLM','Law'),(27,'MBA','Management'),(28,'BBA','Management'),(29,'BMM','Mass Communications'),(30,'MMC','Mass Communications'),(31,'MBBS','Medical'),(32,'PG Medical','Medical'),(33,'B.Sc Nursing','Paramedical'),(34,'M.Sc Nursing','Paramedical'),(35,'B.Pharm','Pharmacy'),(36,'M.Pharm','Pharmacy'),(37,'B.Sc','Science'),(38,'M.Sc','Science'),(39,'BVSc','Veterinary Sciences');
/*!40000 ALTER TABLE `admin_app_course` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-29 22:14:29
