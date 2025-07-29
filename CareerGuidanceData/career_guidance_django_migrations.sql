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
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2025-03-14 10:39:21.570041'),(2,'auth','0001_initial','2025-03-14 10:39:22.643290'),(3,'admin','0001_initial','2025-03-14 10:39:22.900711'),(4,'admin','0002_logentry_remove_auto_add','2025-03-14 10:39:22.913226'),(5,'admin','0003_logentry_add_action_flag_choices','2025-03-14 10:39:22.925278'),(6,'contenttypes','0002_remove_content_type_name','2025-03-14 10:39:23.048369'),(7,'auth','0002_alter_permission_name_max_length','2025-03-14 10:39:23.144586'),(8,'auth','0003_alter_user_email_max_length','2025-03-14 10:39:23.191936'),(9,'auth','0004_alter_user_username_opts','2025-03-14 10:39:23.205946'),(10,'auth','0005_alter_user_last_login_null','2025-03-14 10:39:23.309159'),(11,'auth','0006_require_contenttypes_0002','2025-03-14 10:39:23.316359'),(12,'auth','0007_alter_validators_add_error_messages','2025-03-14 10:39:23.336425'),(13,'auth','0008_alter_user_username_max_length','2025-03-14 10:39:23.464254'),(14,'auth','0009_alter_user_last_name_max_length','2025-03-14 10:39:23.577309'),(15,'auth','0010_alter_group_name_max_length','2025-03-14 10:39:23.610753'),(16,'auth','0011_update_proxy_permissions','2025-03-14 10:39:23.631626'),(17,'auth','0012_alter_user_first_name_max_length','2025-03-14 10:39:23.766552'),(18,'sessions','0001_initial','2025-03-14 10:39:23.840445'),(19,'students','0001_initial','2025-03-14 10:39:24.354527'),(20,'students','0002_customuser_date_joined','2025-03-14 13:50:14.578100'),(23,'students','0003_customuser_user_type','2025-03-15 00:55:34.943405'),(25,'token_blacklist','0001_initial','2025-03-15 10:44:59.803659'),(26,'token_blacklist','0002_outstandingtoken_jti_hex','2025-03-15 10:44:59.878247'),(27,'token_blacklist','0003_auto_20171017_2007','2025-03-15 10:44:59.899974'),(28,'token_blacklist','0004_auto_20171017_2013','2025-03-15 10:45:00.100877'),(29,'token_blacklist','0005_remove_outstandingtoken_jti','2025-03-15 10:45:00.206330'),(30,'token_blacklist','0006_auto_20171017_2113','2025-03-15 10:45:00.253535'),(31,'token_blacklist','0007_auto_20171017_2214','2025-03-15 10:45:00.643536'),(32,'token_blacklist','0008_migrate_to_bigautofield','2025-03-15 10:45:00.963453'),(33,'token_blacklist','0010_fix_migrate_to_bigautofield','2025-03-15 10:45:00.980824'),(34,'token_blacklist','0011_linearizes_history','2025-03-15 10:45:00.986491'),(35,'token_blacklist','0012_alter_outstandingtoken_user','2025-03-15 10:45:01.010863'),(36,'students','0004_rename_student_id_customuser_id','2025-03-15 11:37:36.015975'),(37,'admin_app','0001_initial','2025-03-29 10:22:03.116824'),(38,'admin_app','0002_remove_adminuser_is_admin_adminuser_admin_role','2025-03-29 10:22:03.179319'),(39,'admin_app','0003_remove_adminuser_admin_role_adminuser_is_admin','2025-03-29 10:22:03.260150'),(40,'admin_app','0004_alter_adminuser_options_alter_testquestion_text_and_more','2025-03-29 10:22:03.569190'),(41,'admin_app','0005_psychometricquestion_psychometricanswer','2025-06-02 19:27:21.987968'),(42,'students','0005_alter_customuser_anon_username_and_more','2025-06-02 19:27:22.769690'),(43,'admin_app','0005_psychometricquestion_psychometricoption_and_more','2025-06-02 19:47:47.827172'),(44,'admin_app','0006_psychometricanswer_created_at_and_more','2025-06-02 21:22:25.788586'),(45,'colleges','0001_initial','2025-06-02 21:22:26.694026'),(46,'colleges','0002_collegecourse_category_collegecourse_cutoff_score','2025-06-02 21:22:26.823530'),(47,'students','0006_customuser_preferred_city_customuser_tenth_marks_and_more','2025-06-02 21:22:27.115245'),(48,'students','0007_customuser_category_score_mapping','2025-06-02 21:38:55.974867'),(49,'admin_app','0007_collegetype_course_college_collegecourse_and_more','2025-06-03 00:24:53.532745'),(50,'admin_app','0008_college_average_package_college_entrance_exams','2025-06-03 01:33:44.296649'),(51,'admin_app','0009_college_institute_type','2025-06-03 08:39:45.708755'),(52,'admin_app','0010_collegecourse_selection_criteria','2025-06-03 11:34:07.435848'),(53,'students','0008_customuser_graduation_marks_and_more','2025-06-03 20:15:43.978721');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
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
