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
-- Table structure for table `admin_app_testoption`
--

DROP TABLE IF EXISTS `admin_app_testoption`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_app_testoption` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  `is_correct` tinyint(1) NOT NULL,
  `question_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_app_t_questio_7247b2_idx` (`question_id`),
  KEY `admin_app_t_questio_b3f0cf_idx` (`question_id`,`is_correct`),
  CONSTRAINT `admin_app_testoption_question_id_4ae3b4bd_fk_admin_app` FOREIGN KEY (`question_id`) REFERENCES `admin_app_testquestion` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=277 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_app_testoption`
--

LOCK TABLES `admin_app_testoption` WRITE;
/*!40000 ALTER TABLE `admin_app_testoption` DISABLE KEYS */;
INSERT INTO `admin_app_testoption` VALUES (1,'151',0,1),(2,'190',0,1),(3,'191',0,1),(4,'197',1,1),(5,'40',0,2),(6,'42',1,2),(7,'45',0,2),(8,'50',0,2),(9,'50',0,3),(10,'60',0,3),(11,'70',1,3),(12,'80',0,3),(13,'Father',1,4),(14,'Uncle',0,4),(15,'Brother',0,4),(16,'Cousin',0,4),(17,'OQPP',1,5),(18,'PQRP',0,5),(19,'NPPQ',0,5),(20,'OQRR',0,5),(21,'4 years',0,6),(22,'5 years',1,6),(23,'6 years',0,6),(24,'7 years',0,6),(25,'DOG',0,7),(26,'CAT',0,7),(27,'ELEPHANT',0,7),(28,'SHARK',1,7),(29,'Some roses fade quickly.',0,8),(30,'Some flowers are roses.',1,8),(31,'All flowers are roses.',0,8),(32,'Some roses are not flowers.',0,8),(33,'97.5°',1,9),(34,'140°',0,9),(35,'90°',0,9),(36,'120°',0,9),(37,'5m East',0,10),(38,'10m West',0,10),(39,'5m North',0,10),(40,'10m East',1,10),(41,'Studying regularly is necessary to pass.',1,11),(42,'Only intelligent people pass exams.',0,11),(43,'Exams are tough.',0,11),(44,'Studying for one night is enough.',0,11),(45,'65',0,12),(46,'75',0,12),(47,'70',1,12),(48,'80',0,12),(49,'A',0,13),(50,'B',0,13),(51,'C',0,13),(52,'D',1,13),(53,'7:30',1,14),(54,'8:30',0,14),(55,'6:30',0,14),(56,'5:30',0,14),(57,'Tuesday',0,15),(58,'Monday',1,15),(59,'Wednesday',0,15),(60,'Sunday',0,15),(61,'60',1,16),(62,'50',0,16),(63,'70',0,16),(64,'55',0,16),(65,'36',0,17),(66,'40',0,17),(67,'42',1,17),(68,'56',0,17),(69,'25',0,18),(70,'19',1,18),(71,'20',0,18),(72,'18',0,18),(73,'75%',0,19),(74,'80%',1,19),(75,'82%',0,19),(76,'85%',0,19),(77,'20%',0,20),(78,'25%',1,20),(79,'30%',0,20),(80,'40%',0,20),(81,'2 hours',0,21),(82,'2.5 hours',0,21),(83,'3 hours',1,21),(84,'3.5 hours',0,21),(85,'3:7',0,22),(86,'12.35',1,22),(87,'4:15',0,22),(88,'5:21',0,22),(89,'10',1,23),(90,'5',0,23),(91,'8',0,23),(92,'12',0,23),(93,'4/15',0,24),(94,'5/15',1,24),(95,'6/15',0,24),(96,'1/3',0,24),(97,'12% profit',1,25),(98,'8% profit',0,25),(99,'10% profit',0,25),(100,'5% profit',0,25),(101,'₹2,400',1,26),(102,'₹3,000',0,26),(103,'₹2,000',0,26),(104,'₹1,800',0,26),(105,'4 days',1,27),(106,'5 days',0,27),(107,'6 days',0,27),(108,'7 days',0,27),(109,'24 years',0,28),(110,'30 years',0,28),(111,'36 years',1,28),(112,'40 years',0,28),(113,'120 m',0,29),(114,'140 m',0,29),(115,'160 m',1,29),(116,'180 m',0,29),(117,'25 minutes',0,30),(118,'40 minutes',0,30),(119,'Never fills (tank keeps draining)',1,30),(120,'45 minutes',0,30),(121,'Apple',0,31),(122,'Orange',0,31),(123,'Banana',0,31),(124,'Carrot',1,31),(125,'School',1,32),(126,'Book',0,32),(127,'Student',0,32),(128,'Class',0,32),(129,'Hammer',0,33),(130,'Wrench',0,33),(131,'Screwdriver',0,33),(132,'Shirt',1,33),(133,'ELBAT',1,34),(134,'BTALE',0,34),(135,'TAEBL',0,34),(136,'BLETA',0,34),(137,'X',0,35),(138,'Y',0,35),(139,'Z',0,35),(140,'Y',1,35),(141,'Musician',1,36),(142,'Conductor',0,36),(143,'Player',0,36),(144,'Band',0,36),(145,'Uncle',1,37),(146,'Father',0,37),(147,'Brother',0,37),(148,'Grandfather',0,37),(149,'4156',0,38),(150,'4560',1,38),(151,'5620',0,38),(152,'3215',0,38),(153,'A problem is given should be solved.',0,39),(154,'A given problem should be solved',1,39),(155,'Should be a problem solved given.',0,39),(156,'Problem should be a given solved.',0,39),(157,'Some roses are white.',0,40),(158,'All white flowers are roses.',0,40),(159,'Some roses may be white.',1,40),(160,'None of the above.',0,40),(161,'74',0,41),(162,'47',1,41),(163,'77',0,41),(164,'44',0,41),(165,' 2-3-4-1',0,42),(166,'1-4-2-3',1,42),(167,'3-1-2-4',0,42),(168,'4-2-1-3',0,42),(169,'Circle',0,43),(170,'Square',0,43),(171,'Triangle',0,43),(172,'Sphere',1,43),(173,'GTEIR',0,44),(174,'TEGRI',1,44),(175,'RGITE',0,44),(176,'TGEIR',0,44),(177,'20',0,45),(178,'24',0,45),(179,'25',1,45),(180,'30',0,45),(181,'Rabindranath Tagore',1,46),(182,'C. V. Raman',0,46),(183,'Mother Teresa',0,46),(184,'Amartya Sen',0,46),(185,'Australia',0,47),(186,'Canada',1,47),(187,'USA',0,47),(188,'Russia',0,47),(189,'Almaty',0,48),(190,'Tashkent',0,48),(191,'Nur-Sultan',1,48),(192,'Bishkek',0,48),(193,'1789',1,49),(194,'1804',0,49),(195,'1750',0,49),(196,'1815',0,49),(197,'Mahatma Gandhi',0,50),(198,'Jawaharlal Nehru',0,50),(199,'B. R. Ambedkar',1,50),(200,'Sardar Patel',0,50),(201,'Ganymede',1,51),(202,'Titan',0,51),(203,'Callisto',0,51),(204,'Europa',0,51),(205,'Red Sea and Mediterranean Sea',1,52),(206,'Arabian Sea and Mediterranean Sea',0,52),(207,'Red Sea and Arabian Sea',0,52),(208,'Black Sea and Mediterranean Sea',0,52),(209,'Christopher Columbus',0,53),(210,'Ferdinand Magellan',0,53),(211,'Vasco da Gama',1,53),(212,'Marco Polo',0,53),(213,'Yen',0,54),(214,'Ringgit',0,54),(215,'Won',1,54),(216,'Baht',0,54),(217,'Meteorology',1,55),(218,'Biology',0,55),(219,'Astronomy',0,55),(220,'Quantum Physics',0,55),(221,'Africa',0,56),(222,'Europe',1,56),(223,'South America',0,56),(224,'Australia',0,56),(225,'Sally Ride',0,57),(226,'Kalpana Chawla',0,57),(227,'Valentina Tereshkova',1,57),(228,'Sunita Williams',0,57),(229,'1764',0,58),(230,'1757',1,58),(231,'1857',0,58),(232,'1799',0,58),(233,'William Shakespeare',1,60),(234,'Charles Dickens',0,60),(235,'Leo Tolstoy',0,60),(236,'Mark Twain',0,60),(237,'Earth',0,61),(238,'Mars',1,61),(239,'Jupiter',0,61),(240,'Venus',0,61),(245,'Earth',0,63),(246,'Mars',1,63),(247,'Jupiter',0,63),(248,'Venus',0,63),(249,'Earth',0,64),(250,'Mars',1,64),(251,'Jupiter',0,64),(252,'Venus',0,64),(253,'90°C',0,65),(254,'100°C',1,65),(255,'110°C',0,65),(256,'120°C',0,65),(257,'TZ',1,66),(258,'SY',0,66),(259,'SX',0,66),(260,'RW',0,66),(261,'viscosity of ink',0,67),(262,'capillary action phenomenon',1,67),(263,'diffusion of ink through the blotting',0,67),(264,'siphon action',0,67),(273,'option 12',1,69),(274,'option 22',0,69),(275,'option 32',0,69),(276,'option 42',0,69);
/*!40000 ALTER TABLE `admin_app_testoption` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-29 22:14:25
