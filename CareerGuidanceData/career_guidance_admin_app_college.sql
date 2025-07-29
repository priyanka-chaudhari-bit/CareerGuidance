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
-- Table structure for table `admin_app_college`
--

DROP TABLE IF EXISTS `admin_app_college`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_app_college` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `location` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `hostel_fees` decimal(10,2) NOT NULL,
  `ranking` int NOT NULL,
  `scholarships` longtext NOT NULL,
  `placements` longtext NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `recognized_by` varchar(255) NOT NULL,
  `about` longtext NOT NULL,
  `established_year` int NOT NULL,
  `top_recruiters` longtext NOT NULL,
  `average_package` varchar(50) NOT NULL,
  `entrance_exams` json NOT NULL DEFAULT (_utf8mb4'[]'),
  `institute_type` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_app_college`
--

LOCK TABLES `admin_app_college` WRITE;
/*!40000 ALTER TABLE `admin_app_college` DISABLE KEYS */;
INSERT INTO `admin_app_college` VALUES (6,'Indian Institute of Technology, Bombay','India','Mumbai',50000.00,1,'Merit-based, Sports quota','90% placement in IT companies','2025-06-03 08:42:00.439572','UGC, AICTE','Top-ranked engineering college in Mumbai.\nIndian Institute of Technology Bombay, popularly known as IIT Bombay or IIT Mumbai, is an autonomous institute established in 1958. As per the data, the maximum number of top JEE (Advanced) rankers chose IIT Bombay, including all top 10 rankers in 2024. 70% of JEE Advanced top rankers opt for this institute because of its career opportunities and its location in the financial hub of India.\n\nAccording to the NIRF Ranking 2024, IITB is ranked 3rd in both B.Tech and Overall categories. Internationally, the institute has been ranked 118th by the QS World University Ranking 2025 under the Top Global Universities.',1958,'Google,Amazon,Microsoft, Infosys, TCS, Apple, Google, Intel, Godrej, Halliburton, Accenture, Barclays, Michelin, Pfizer, Amazon, Honeywell, Hitachi, Boeing, Reliance, Sony, Qualcomm, Nvidia, Bosch, Texas Instruments, Adobe, Atlassian','INR 23.5 LPA','[\"JEE Advanced\", \"GATE\", \"IIT JAM\", \"CEED\", \"CAT\"]','Autonomous Institute'),(7,'All India Institute of Medical Sciences (AIIMS), Delhi','India','Delhi',0.00,1,'Merit-based, Sports quota','95% placement','2025-06-03 08:56:45.495551','MCI, NMC','All India Institute of Medical Sciences, Delhi (AIIMS Delhi) is considered the best medical institute in India, ranked 1st in the Medical Category by NIRF in 2024. AIIMS Delhi is the first AIIMS in India, established in 1956 under an Act of Parliament. Recognized as an ‘Institute of National Importance’ by the Government of India, it currently operates autonomously under the Ministry of Health & Family Welfare. AIIMS Delhi has also been ranked 1st in Medicine by IIRF in 2024.\n AIIMS Delhi offers UG, PG, and Doctoral courses under its 40+ departments across Medicine, Dentistry, Nursing, and Paramedical. AIIMS Delhi MBBS is considered to be the top choice for every medical aspirant in India. The institute offers a total of 125 seats for MBBS annually.',1956,'Apollo Hospitals, Medanta, Max Healthcare, PGIMER, Sir Ganga Ram Hospital, Fortis Hospitals','INR 12 LPA','[\"NEET UG\", \"INI CET\", \"INI SS\", \"AIIMS Entrance Exam\"]','Government (Institute of National Importance)'),(8,'IIM Bangalore','India','Bangalore',80000.00,1,'Merit-based, Sports quota','95% placement','2025-06-03 10:25:02.867486','EFMD Quality Improvement System (EQUIS)','The Indian Institute of Management Bangalore (IIMB) is a leading graduate school of management in Asia. Under the IIM Act of 2017, IIMB is an Institute of National Importance.\n IIMB has 104 full-time faculty members, about 1,200 students across various degree-granting programmes and nearly 5,000 annual Executive Education participants.\nLocated in India’s high technology capital, IIMB is in close proximity to some of the leading corporate houses in the country, ranging from information technology to consumer product companies, giving IIMB the added advantage of integrating classroom knowledge with practical experience.',1947,'McKinsey & Company, American Express, Bain & Company, PwC, Boston Consulting Group, TCS Consulting Management, Accenture Strategy','INR 35.92 LPA','[\"CAT\", \"GMAT\", \"GRE\", \"GATE\", \"NET\", \"IIMB\"]','Autonomous (Institute of National Importance)'),(9,'MIT World Peace University','India','Pune',250000.00,89,'Merit-based, Sports quota,Hon’ble Shri TN Seshan Scholarship, MITWPU Merit Scholarship, Dr Vishwanath Karad Scholarship','70% placement','2025-06-03 10:48:51.989247','University Grants Commission, Bar Council of India, Pharmacy Council of India','MIT World Peace University is a leading private engineering and management institution in India. Recognised by the UGC, MIT Pune Kothrud campus is a part of the MIT Group of Institutions. The institute offers undergraduate, postgraduate and PhD programs in Engineering & Technology, Management, Law, Design, and Computer Applications, among other streams.',1983,'IBM, Infosys, HCL, Microsoft, Asian Paints, Deloitte, Michelin India, Tech Mahindra, Axis Bank','INR 7 LPA','[\"MIT-WPU CET\", \"CAT\", \"XAT\", \"MAT\", \"CMAT\", \"JEE Main\", \"GATE\", \"MAHCET\", \"MHTCET\"]','Private');
/*!40000 ALTER TABLE `admin_app_college` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-29 22:14:31
