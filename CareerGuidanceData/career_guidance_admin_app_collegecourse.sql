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
-- Table structure for table `admin_app_collegecourse`
--

DROP TABLE IF EXISTS `admin_app_collegecourse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_app_collegecourse` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `tuition_fees` decimal(10,2) NOT NULL,
  `placements` longtext NOT NULL,
  `eligibility_criteria` longtext NOT NULL,
  `category` varchar(50) NOT NULL,
  `cutoff_score` double DEFAULT NULL,
  `college_id` bigint NOT NULL,
  `course_id` bigint NOT NULL,
  `selection_criteria` longtext NOT NULL DEFAULT (_utf8mb4''),
  PRIMARY KEY (`id`),
  KEY `admin_app_collegecou_college_id_935df9c3_fk_admin_app` (`college_id`),
  KEY `admin_app_collegecou_course_id_21ed955a_fk_admin_app` (`course_id`),
  CONSTRAINT `admin_app_collegecou_college_id_935df9c3_fk_admin_app` FOREIGN KEY (`college_id`) REFERENCES `admin_app_college` (`id`),
  CONSTRAINT `admin_app_collegecou_course_id_21ed955a_fk_admin_app` FOREIGN KEY (`course_id`) REFERENCES `admin_app_course` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_app_collegecourse`
--

LOCK TABLES `admin_app_collegecourse` WRITE;
/*!40000 ALTER TABLE `admin_app_collegecourse` DISABLE KEYS */;
INSERT INTO `admin_app_collegecourse` VALUES (1,230700.00,'INR 19.61 LPA','10+2 with 75% marks in PCM','',NULL,6,20,'JEE Advanced + JoSAA Counselling'),(2,66700.00,'INR 20.61 LPA','BE/B.Tech/B.Arch with 60% marks','',NULL,6,21,'GATE + COAP Counselling'),(3,433000.00,'INR 28.61 LPA','Bachelor’s degree with 60% marks','',NULL,6,27,'CAT + PI'),(4,1628.00,'INR 28.61 LPA','Passed 10+2 in Physics, Chemistry, and Biology with an aggregate of 50% Marks (45% for SC/ST) from a recognized board.','',NULL,7,31,'Rank in NEET UG + MCC NEET UG Counselling'),(5,2027.00,'INR 30.61 LPA','BDS Degree with 55% Aggregate Marks with Internship','',NULL,7,15,'Rank in INI CET + AIIMS INI CET Counselling'),(6,2450000.00,'INR 35.92 LPA','Graduation with 50% marks (45% for SC/ ST/ PwD) + valid CAT/ GMAT scores','',NULL,8,27,'CAT/ GMAT examination, PI shortlist, and final merit list preparation based on multiple parameters'),(7,1750000.00,'INR 35.92 LPA','10+2 with 50% + MHTCET','',NULL,9,20,'Minimum 50% Aggregate Score in PCM/PCB or Physics & Mathematics with any Technical Vocational SubjectEligibility + Statement of Purpose + JEE / MHTCET / PERA / NEET (Bioengineering)'),(8,410000.00,'INR 30.92 LPA','Graduation with 50% + GATE','',NULL,9,21,'Minimum 50% Aggregate Score in Graduation (4 Years) of relevant Engineering Branch from UGC approved University or equivalent + MIT-WPU CET Score / PERA / GATE Score & Personal Interaction'),(9,470000.00,'INR 10.92 LPA','Graduation + CAT','',NULL,9,27,'Minimum 60% Aggregate in Graduation (3/4 Year Full-time Bachelors Degree) in any stream from UGC approved University or equivalent + CAT/ XAT/ NMAT/ GMAT/ MAH-CET/ MAT + GD + PI + SOP + Past Academic Record + Work Experience'),(10,1275000.00,'INR 8 LPA','10+2 with 50% + MIT-WPU CET','',NULL,9,28,'Minimum 50% Aggregate Score in 10+2/Class 12th or Equivalent in Any Stream with English + MIT-WPU CET + PI'),(11,540000.00,'INR 8 LPA','10+2 with 55% + MIT-WPU CET','',NULL,9,12,'Minimum 50% Aggregate Score in 10+2/Class 12th or Equivalent in Science Stream with English + MIT-WPU CET + PI'),(12,410000.00,'INR 8 LPA','Graduation + MAH MCA CET','',NULL,9,13,'Minimum 60% Marks in 3/4-Year Graduation in Science Stream / BCA or other science-related Degree + MIT-WPU CET + PI Score'),(13,400000.00,'INR 8 LPA','Graduation + MIT-WPU CET PG','',NULL,9,38,'Minimum 60% Marks in 3/4-Year Graduation in Science Stream + MIT-WPU CET + PI Score'),(14,900000.00,'INR 8 LPA','10+2 with 50% + MIT-WPU CET','',NULL,9,37,'Minimum 50% Marks in 10+2 + MIT-WPU CET + PI Score'),(15,260000.00,'INR 20 LPA','Minimum 50% aggregate score in 10+2/Class 12th with English subject or in equivalent examination (at least 45% marks, in case of Reserved Class category candidate belonging to Maharashtra State only)','',NULL,9,25,'The selection process for the Programmes is based on MIT-WPU CET 2025 / CLAT 2025 / MH CET Law 2025 & Personal Interaction score'),(16,300000.00,'INR 20 LPA','Graduation in Law with a minimum 50% aggregate score (at least 45% marks, in case of Reserved Class category candidate belonging to Maharashtra State only)','',NULL,9,26,'The selection process for the Programme is based on MIT-WPU CET 2025 Personal Interview score'),(17,940000.00,'INR 4.8 LPA','Minimum 50% aggregate in PCM/PCB in 10+2/Class 12th (with Physics and Chemistry as compulsory subjects along with one of the subjects Mathematics or Biology) or in an equivalent examination (at least 45% marks, in case of Reserved Class category candidate belonging to Maharashtra State only)\nAnd\nValid Score in NEET 2025 / MHT-CET 2025 / JEE 2025 / PERA 2025.','',NULL,9,35,'Selection Process is based on the valid score submitted for NEET 2025 / MHT-CET 2025 / JEE 2025 / PERA 2025 and a Statement of Purpose (500 words) written by the student'),(18,600000.00,'INR 8 LPA','Passed Bachelor\'s Degree in Pharmacy from any All India Council for Technical Education or Pharmacy Council of India or Central or State Government approved institution with minimum 60% aggregate score (at least 50% marks in case Reserved Class category and persons with Disability Candidates belonging to Maharashtra State only).\nThe Candidates should have registered with the State Pharmacy Council. The candidates not having registration should produce the registration certificate within one month after securing admission. Obtained valid score in Graduate Pharmacy Aptitude Test 2023, 2024 or 2025 (GPAT) conducted by National Testing Agency','',NULL,9,36,'Selection process is based on GPAT 2023/2024/2025 score and an Online Personal Interaction (PI).'),(19,1735.00,'INR 12.50 LPA','Passed 10+2 with an aggregate of 50% Marks in PCB','',NULL,7,33,'AIIMS B.Sc Nursing Entrance + AIIMS B.Sc Nursing Counselling'),(20,1465.00,'INR 12.50 LPA','B.Sc Nursing with 55% Aggregate Marks','',NULL,7,34,'AIIMS M.Sc Entrance Exam + AIIMS M.Sc Nursing Counselling'),(21,1567.00,'INR 12.50 LPA','MBBS Degree with 55% Aggregate Marks with Internship','',NULL,7,32,'Rank in INI CET + AIIMS INI CET Counselling'),(22,400000.00,'INR 12.50 LPA','10+2 with 50% marks','',NULL,6,16,'UCEED + Interview'),(23,300000.00,'INR 12.50 LPA','B.Des/B.Arch/BE/B.Tech/BFA with 55% marks','',NULL,6,17,'CEED + DAT + Interview'),(24,30000.00,'INR 12.50 LPA','10+2 with 75% marks','',NULL,6,37,'IIT JAM'),(25,20000.00,'INR 12.50 LPA','BS/B.Sc with 60% marks','',NULL,6,38,'IIT JAM + JOAPS Counselling'),(26,900000.00,'INR 10 LPA','Minimum 50% aggregate score in 10+2/Class 12th in any stream with compulsory English as a subject or in equivalent examination (at least 45% marks, in case of Reserved Class category candidate belonging to Maharashtra State only)\nAnd\nValid score in MIT-WPU CET 2025 / UCEED 2025 / NIFT 2025 / NATA 2025 / NID 2025','',NULL,9,16,'Admissions will be provided purely based on merit of MIT-WPU CET 2025 / UCEED 2025 / NIFT 2025 / NATA 2025 / NID 2025 score, Personal Interaction (PI) and Portfolio Review as per the schedule'),(27,800000.00,'INR 12 LPA','Minimum 60% aggregate score in any 4-year Science / Architecture / Engineering / Design graduation from UGC approved Institution or equivalent (at least 55% marks, in case of Reserved Class category candidate belonging to Maharashtra State only','',NULL,9,17,'Admissions will be provided purely based on merit of CEED 2025 / MIT-WPU CET 2025 score, Personal Interaction (PI) and Portfolio Review.\n(The exact date and time of the online Examination and Personal Interaction will be communicated to the candidate once scheduled.)');
/*!40000 ALTER TABLE `admin_app_collegecourse` ENABLE KEYS */;
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
