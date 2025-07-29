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
-- Table structure for table `students_customuser`
--

DROP TABLE IF EXISTS `students_customuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students_customuser` (
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `anon_username` varchar(50) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(254) NOT NULL,
  `password` varchar(100) NOT NULL,
  `cgpa` double DEFAULT NULL,
  `entrance_exam` varchar(50) DEFAULT NULL,
  `entrance_score` double DEFAULT NULL,
  `preferred_location` varchar(100) DEFAULT NULL,
  `desired_course` varchar(100) DEFAULT NULL,
  `aptitude_score` double DEFAULT NULL,
  `interest_mapping` json DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `user_type` varchar(10) NOT NULL,
  `preferred_city` varchar(50) DEFAULT NULL,
  `tenth_marks` double DEFAULT NULL,
  `twelfth_marks` double DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL,
  `category_score_mapping` json NOT NULL DEFAULT (_utf8mb4'{}'),
  `graduation_marks` double DEFAULT NULL,
  `postgraduation_marks` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `anon_username` (`anon_username`),
  KEY `students_customuser_date_joined_896909f3` (`date_joined`),
  KEY `students_customuser_is_active_666e5276` (`is_active`),
  KEY `students_cu_user_ty_dead82_idx` (`user_type`,`is_active`),
  KEY `students_cu_cgpa_c6ac81_idx` (`cgpa`,`entrance_score`),
  KEY `students_cu_preferr_7b016a_idx` (`preferred_location`,`desired_course`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students_customuser`
--

LOCK TABLES `students_customuser` WRITE;
/*!40000 ALTER TABLE `students_customuser` DISABLE KEYS */;
INSERT INTO `students_customuser` VALUES (NULL,0,9,'Random','Priyanka','Priyanka2@example.com','pbkdf2_sha256$720000$DajJwfXyIo3jgWyFRtj1mv$OwsnU5ZYoBPWciDSansER/XYN/JYFclJEKBCfVcetFI=',NULL,NULL,NULL,NULL,NULL,NULL,'{}',1,0,0,'2025-03-14 16:19:25.127186','user',NULL,NULL,NULL,'2025-06-02 21:22:27.031578','{}',NULL,NULL),(NULL,0,10,'CalmSwan5f610b','Priyanka','Priyanka@example.com','pbkdf2_sha256$720000$FGHr4amlvCnAftq3FypkP5$a+R+2DQc0GnX/pb8PzH8IvDirjkseaDNlH9SQK5wApA=',NULL,NULL,NULL,NULL,NULL,NULL,'{}',1,0,0,'2025-03-14 16:20:16.943943','user',NULL,NULL,NULL,'2025-06-02 21:22:27.031578','{}',NULL,NULL),(NULL,0,11,'CalmFoxcd8517','Priyanka','Priyanka3@example.com','pbkdf2_sha256$720000$uG4mBlmsSMYjILmZs3uOdK$dyG+UyNUOcKHWizNTY5ENpheqe8XmYZ4uLrnj6NYdiM=',NULL,NULL,NULL,NULL,NULL,NULL,'{}',1,0,0,'2025-03-15 11:23:10.929546','user',NULL,NULL,NULL,'2025-06-02 21:22:27.031578','{}',NULL,NULL),(NULL,0,12,'MindfulOwl023378','Priyanka','Priyanka4@example.com','pbkdf2_sha256$720000$fU8o82MKzaMfBqB1EkQKD8$Fj1iKpZfDcfBYbbz0Eb0xZ/ma8M2Smy9nR00RYV1IFU=',NULL,NULL,NULL,NULL,NULL,NULL,'{}',1,0,0,'2025-03-15 11:38:31.299602','user',NULL,NULL,NULL,'2025-06-02 21:22:27.031578','{}',NULL,NULL),(NULL,0,13,'MindfulSwan49dab2','Priyanka','Priyanka5@example.com','pbkdf2_sha256$720000$qGGUZn9zS0NA0ZQM7ZToyY$mTjU8Ltzp7DhOS1RI1wXA0xg+MQHtB6HIBRjb4+cgwE=',NULL,NULL,NULL,NULL,NULL,NULL,'{}',1,0,0,'2025-03-19 10:13:20.075755','user',NULL,NULL,NULL,'2025-06-02 21:22:27.031578','{}',NULL,NULL),(NULL,0,14,'MindfulSwan779e70','Priyanka','Priyanka6@example.com','pbkdf2_sha256$720000$k2QccNQAkawFQQRfh8lUQb$MDY1fsDICraIXBBfAA6BkfmgrfLi2LcHwrX5xr3a+6o=',NULL,NULL,NULL,NULL,NULL,NULL,'{}',1,0,0,'2025-03-19 10:42:22.520531','user',NULL,NULL,NULL,'2025-06-02 21:22:27.031578','{}',NULL,NULL),(NULL,0,15,'BrightDolphinad4427','Priyanka','Priyanka7@example.com','pbkdf2_sha256$720000$05HpVqelo61QC0r6MifYc3$yOM6tV8wnaJHn8U3vqGn3OvOx0fahWtglIg8FNy7B0I=',7.03,'NEET',70.6,'India','MCA',6.153846153846154,'{}',1,0,0,'2025-03-19 10:46:02.802885','user','pune',88,66,'2025-07-26 11:27:58.358632','{\"Verbal Reasoning\": 0.0, \"General Knowledge\": 0.0, \"Logical Reasoning\": 20.0, \"Quantitative Aptitude\": 6.67}',NULL,NULL),(NULL,0,16,'BrightDolphin685e66','Priyanka Fetest','Priyanka8@example.com','pbkdf2_sha256$720000$Cx6cJrtJIRxqmz51YiJ5aR$2cCjB/hW0jlH/hroYNifEHUz2kvfO+CQwac2RTnhCtk=',NULL,NULL,NULL,NULL,NULL,NULL,'{}',1,0,0,'2025-06-04 15:34:52.394338','user',NULL,NULL,NULL,'2025-06-04 15:34:52.794460','{}',NULL,NULL),(NULL,0,17,'CalmLion37abf3','Priyanka Fetest','Priyanka9@example.com','pbkdf2_sha256$720000$DiFLdae1TV5JU3zsm9phHv$m+xmOTU4G+9fPWnONYoyE1HBVfrGdqA2wG78GGa8sxg=',NULL,NULL,NULL,NULL,NULL,NULL,'{}',1,0,0,'2025-06-04 16:39:48.383317','user',NULL,NULL,NULL,'2025-06-04 16:39:49.790486','{}',NULL,NULL),(NULL,0,18,'CalmLionc6d3fb','Priyanka fetest2','Priyanka10@example.com','pbkdf2_sha256$720000$X3KJWvAU5nnZs8lzT4NXtb$nVldGo913m6SsKCWKsrcTZrfsm1Fy6cm3A/ZIm62Jh8=',9.03,'JEE',93.6,'India','B.Tech',36.92307692307693,'{}',1,0,0,'2025-06-04 18:07:38.040885','user','Pune',88,66,'2025-06-05 11:22:27.340155','{\"Verbal Reasoning\": 20.0, \"General Knowledge\": 45.0, \"Logical Reasoning\": 33.33, \"Quantitative Aptitude\": 46.67}',77,75),(NULL,0,19,'BrightDolphinad4427fe','Priyanka testfe3','Priyanka11@example.com','pbkdf2_sha256$720000$U3uaRczoIm6XSG06rp4smm$/o1sIqQVBZVWc6kJAjfYivjXsBWNtN9FFF4LclRM+M0=',9.03,'CAT',93.6,'India','MBA',NULL,'{}',1,0,0,'2025-06-04 20:35:02.802985','user','Mumbai',88,66,'2025-06-04 20:36:35.661959','{}',78,76),(NULL,0,20,'BrightDolphinad4427f2','Priyu','Priyanka12@example.com','pbkdf2_sha256$720000$95SNY4G2hnucqnH5P3Iion$E23v4DXussgLuAQ3UvczsqA2JisyoDKd7tFgR8IakCc=',NULL,NULL,NULL,NULL,NULL,NULL,'{}',1,0,0,'2025-06-04 21:00:44.256198','user',NULL,NULL,NULL,'2025-06-04 21:00:44.678542','{}',NULL,NULL),(NULL,0,21,'BrightDolphind4427f2','priyu','Priyanka13@example.com','pbkdf2_sha256$720000$0WIsJkCuDayqm0nJvvRQBH$m00X9mqw2EJ0oLTlVTj+t4X6w64yV3nIoxdGKmfYwR8=',NULL,NULL,NULL,NULL,NULL,NULL,'{}',1,0,0,'2025-06-04 21:22:45.283907','user',NULL,NULL,NULL,'2025-06-04 21:22:45.720106','{}',NULL,NULL),(NULL,0,22,'BrightDolphinad4452','Priyanka Chaudhari','Priyanka14@example.com','pbkdf2_sha256$720000$lZLubSGDYrTNniU7jbW0Cr$urjg9CfY4K8zeOt9VdZptuzexMvyIvrddAeEt9cXEgM=',9.03,'JEE',93.6,'India','B.Tech',33.84615384615385,'{}',1,0,0,'2025-06-05 14:00:15.135780','user','Pune',88,66,'2025-06-05 14:05:29.043401','{\"Verbal Reasoning\": 46.67, \"General Knowledge\": 35.0, \"Logical Reasoning\": 20.0, \"Quantitative Aptitude\": 33.33}',77,75),(NULL,0,23,'PeacefulDolphinf62f4d','Priyanka Chaudhari','Priyanka15@example.com','pbkdf2_sha256$720000$oq6XmLFrFmgZcnhJvvzVTp$IPTQC023rg8vvzeQdluuoLKq5/FzUjbfjf+Q7eNVxvA=',9.03,'JEE',93.6,'India','B.Tech',0,'{}',1,0,0,'2025-06-05 21:09:13.673098','user','Pune',88,66,'2025-06-05 21:17:25.763040','{\"Verbal Reasoning\": 0.0, \"General Knowledge\": 0.0, \"Logical Reasoning\": 0.0, \"Quantitative Aptitude\": 0.0}',77,75),(NULL,0,24,'somerandom','Priyanka Chaudhari','Priyanka16@example.com','pbkdf2_sha256$720000$fvcx9qjthqijBAs87kmr8a$U0lyvQD6naPpgI4y808FzgKakN8jSB+X/WjhxNcg86U=',9.03,'JEE',93.6,'India','B.Tech',52.307692307692314,'{}',1,0,0,'2025-06-05 21:28:29.634189','user','Pune',88,66,'2025-06-05 21:33:02.484294','{\"Verbal Reasoning\": 66.67, \"General Knowledge\": 45.0, \"Logical Reasoning\": 46.67, \"Quantitative Aptitude\": 53.33}',77,75),(NULL,0,25,'something','Priyu','piyudemo947556@gmail.com','pbkdf2_sha256$720000$53hVWwnlgHM6LgeOV8rBiy$BGVpmjf0J6Uu5Ljh2vbdYN5Q76NX++hbUTVt26Yuf4Y=',NULL,NULL,NULL,NULL,NULL,NULL,'{}',1,0,0,'2025-07-28 10:54:23.905197','user',NULL,NULL,NULL,'2025-07-28 10:54:25.313022','{}',NULL,NULL),(NULL,0,26,'HappySwan1bf69a','somerandom','priyanka26@example.com','pbkdf2_sha256$720000$DIdoqhmnaUds5DyRZ8WR3r$BfW8EudealhXqM94sBpVP1VRd4Qf84qsVCnMn4GWuqw=',7.62,'NEET',451,'India','MCA',NULL,'{}',1,0,0,'2025-07-28 10:57:59.359979','user','Mumbai',53,63,'2025-07-28 11:06:24.132824','{}',9.3,7.5),(NULL,0,27,'PeacefulSwan2de8be','Priya','piyudemo947@gmail.com','pbkdf2_sha256$720000$z4IwotbKjwCPIDsaDWPbEc$9mHt3ZcDdX/xnc4kWVoS2w87TLzvqiMK9L4OjB5XthM=',NULL,NULL,NULL,NULL,NULL,40.909090909090914,'{}',1,0,0,'2025-07-29 13:33:10.488595','user',NULL,NULL,NULL,'2025-07-29 13:41:32.105318','{\"test category\": 100.0, \"Verbal Reasoning\": 60.0, \"General Knowledge\": 52.63, \"Logical Reasoning\": 12.5, \"Quantitative Aptitude\": 33.33}',NULL,NULL);
/*!40000 ALTER TABLE `students_customuser` ENABLE KEYS */;
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
