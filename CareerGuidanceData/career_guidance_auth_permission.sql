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
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add custom user',7,'add_customuser'),(26,'Can change custom user',7,'change_customuser'),(27,'Can delete custom user',7,'delete_customuser'),(28,'Can view custom user',7,'view_customuser'),(29,'Can add test option',8,'add_testoption'),(30,'Can change test option',8,'change_testoption'),(31,'Can delete test option',8,'delete_testoption'),(32,'Can view test option',8,'view_testoption'),(33,'Can add student answer',9,'add_studentanswer'),(34,'Can change student answer',9,'change_studentanswer'),(35,'Can delete student answer',9,'delete_studentanswer'),(36,'Can view student answer',9,'view_studentanswer'),(37,'Can add test category',10,'add_testcategory'),(38,'Can change test category',10,'change_testcategory'),(39,'Can delete test category',10,'delete_testcategory'),(40,'Can view test category',10,'view_testcategory'),(41,'Can add user',11,'add_adminuser'),(42,'Can change user',11,'change_adminuser'),(43,'Can delete user',11,'delete_adminuser'),(44,'Can view user',11,'view_adminuser'),(45,'Can add test question',12,'add_testquestion'),(46,'Can change test question',12,'change_testquestion'),(47,'Can delete test question',12,'delete_testquestion'),(48,'Can view test question',12,'view_testquestion'),(49,'Can add blacklisted token',13,'add_blacklistedtoken'),(50,'Can change blacklisted token',13,'change_blacklistedtoken'),(51,'Can delete blacklisted token',13,'delete_blacklistedtoken'),(52,'Can view blacklisted token',13,'view_blacklistedtoken'),(53,'Can add outstanding token',14,'add_outstandingtoken'),(54,'Can change outstanding token',14,'change_outstandingtoken'),(55,'Can delete outstanding token',14,'delete_outstandingtoken'),(56,'Can view outstanding token',14,'view_outstandingtoken'),(57,'Can add psychometric question',15,'add_psychometricquestion'),(58,'Can change psychometric question',15,'change_psychometricquestion'),(59,'Can delete psychometric question',15,'delete_psychometricquestion'),(60,'Can view psychometric question',15,'view_psychometricquestion'),(61,'Can add psychometric answer',16,'add_psychometricanswer'),(62,'Can change psychometric answer',16,'change_psychometricanswer'),(63,'Can delete psychometric answer',16,'delete_psychometricanswer'),(64,'Can view psychometric answer',16,'view_psychometricanswer'),(65,'Can add psychometric option',17,'add_psychometricoption'),(66,'Can change psychometric option',17,'change_psychometricoption'),(67,'Can delete psychometric option',17,'delete_psychometricoption'),(68,'Can view psychometric option',17,'view_psychometricoption'),(69,'Can add college type',18,'add_collegetype'),(70,'Can change college type',18,'change_collegetype'),(71,'Can delete college type',18,'delete_collegetype'),(72,'Can view college type',18,'view_collegetype'),(73,'Can add course',19,'add_course'),(74,'Can change course',19,'change_course'),(75,'Can delete course',19,'delete_course'),(76,'Can view course',19,'view_course'),(77,'Can add college',20,'add_college'),(78,'Can change college',20,'change_college'),(79,'Can delete college',20,'delete_college'),(80,'Can view college',20,'view_college'),(81,'Can add college course',21,'add_collegecourse'),(82,'Can change college course',21,'change_collegecourse'),(83,'Can delete college course',21,'delete_collegecourse'),(84,'Can view college course',21,'view_collegecourse'),(85,'Can add course cutoff',22,'add_coursecutoff'),(86,'Can change course cutoff',22,'change_coursecutoff'),(87,'Can delete course cutoff',22,'delete_coursecutoff'),(88,'Can view course cutoff',22,'view_coursecutoff'),(89,'Can add psychometric result',23,'add_psychometricresult'),(90,'Can change psychometric result',23,'change_psychometricresult'),(91,'Can delete psychometric result',23,'delete_psychometricresult'),(92,'Can view psychometric result',23,'view_psychometricresult'),(93,'Can add college type',24,'add_collegetype'),(94,'Can change college type',24,'change_collegetype'),(95,'Can delete college type',24,'delete_collegetype'),(96,'Can view college type',24,'view_collegetype'),(97,'Can add course',25,'add_course'),(98,'Can change course',25,'change_course'),(99,'Can delete course',25,'delete_course'),(100,'Can view course',25,'view_course'),(101,'Can add college',26,'add_college'),(102,'Can change college',26,'change_college'),(103,'Can delete college',26,'delete_college'),(104,'Can view college',26,'view_college'),(105,'Can add college course',27,'add_collegecourse'),(106,'Can change college course',27,'change_collegecourse'),(107,'Can delete college course',27,'delete_collegecourse'),(108,'Can view college course',27,'view_collegecourse'),(109,'Can add course cutoff',28,'add_coursecutoff'),(110,'Can change course cutoff',28,'change_coursecutoff'),(111,'Can delete course cutoff',28,'delete_coursecutoff'),(112,'Can view course cutoff',28,'view_coursecutoff');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
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
