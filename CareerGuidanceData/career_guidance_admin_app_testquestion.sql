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
-- Table structure for table `admin_app_testquestion`
--

DROP TABLE IF EXISTS `admin_app_testquestion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_app_testquestion` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  `category_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_app_t_categor_9edbfb_idx` (`category_id`),
  KEY `admin_app_t_categor_0e4c3a_idx` (`category_id`,`text`),
  CONSTRAINT `admin_app_testquesti_category_id_9f336734_fk_admin_app` FOREIGN KEY (`category_id`) REFERENCES `admin_app_testcategory` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_app_testquestion`
--

LOCK TABLES `admin_app_testquestion` WRITE;
/*!40000 ALTER TABLE `admin_app_testquestion` DISABLE KEYS */;
INSERT INTO `admin_app_testquestion` VALUES (9,'A clock shows the time as 2:45 PM. What is the angle between the hour and minute hand?',1),(6,'A father is 5 times older than his son. After 6 years, the father will be 3 times as old as his son. What is the present age of the son?',1),(13,'A, B, C, D, E, and F are sitting in a row. C is to the left of D but to the right of A. B is to the right of D but to the left of E. Who is exactly in the middle?',1),(1,'Find the missing number:\n 5, 11, 23, 47, 95, ?',1),(7,'Find the odd one out:\n DOG, CAT, ELEPHANT, SHARK',1),(15,'If 1st January 2022 was a Saturday, then what day was 15th August 2022?',1),(3,'If 2 + 3 = 13, 3 + 7 = 31, 4 + 5 = 29, then what is 6 + 8 = ?',1),(14,'If a clock shows 4:30 PM, what will be its mirror image?',1),(12,'If MANGO = 50, APPLE = 45, BANANA = 60, then what is ORANGE = ?',1),(5,'In a certain code language, \'STAR\' is written as \'UVCT\'. How will \'MOON\' be written?',1),(4,'Pointing to a person, Rohan said, \'She is the only daughter of my father’s only daughter.\' How is Rohan related to the person?',1),(10,'Ramesh walks 10m North, then turns right and walks 5m, then turns right and walks 10m, and finally turns left and walks 5m. Where is he now from the starting point?',1),(11,'Statement: \'If you want to pass the exam, you must study regularly.\'\nAssumption:',1),(8,'Statements:\n 1. All roses are flowers.\n2. Some flowers fade quickly.\n Conclusion:',1),(66,'What are next two letters in the given series?\nE F H K O ? ?',1),(2,'What comes next in the sequence? \n 2, 6, 12, 20, 30, ?',1),(24,'A bag contains 4 red balls, 5 blue balls, and 6 green balls. If one ball is picked randomly, what is the probability of picking a blue ball?',3),(20,'A shopkeeper bought a pen for ₹40 and sold it for ₹50. What is the profit percentage?',3),(19,'A student scored 72 marks out of 90 in a test. What is the percentage of marks obtained?',3),(26,'A sum of ₹12,000 is lent at simple interest at a rate of 5% per annum for 4 years. What is the total interest earned?',3),(25,'A trader marks up an item by 40% and then offers a discount of 20%. What is the effective profit or loss percentage?',3),(29,'A train running at 72 km/hr takes 18 seconds to cross a bridge that is 200 meters long. What is the length of the train?',3),(21,'A train travels at a speed of 60 km/h. How much time will it take to cover 180 km?',3),(27,'If 4 men and 6 women can complete a task in 8 days, and 3 men and 7 women can complete the same task in 10 days, how many days will it take for 10 men and 10 women to complete the task?',3),(23,'If 5 men can complete a work in 12 days, how many men are required to complete the same work in 6 days?',3),(22,'If A : B = 3:5 and B : C = 4:7, then what is A : C?',3),(28,'The ratio of ages of A and B is 4:5. After 6 years, their ratio will be 5:6. What is A’s present age?',3),(30,'Two pipes can fill a tank in 20 minutes and 30 minutes, respectively, while a third pipe can empty it in 15 minutes. If all three pipes are opened together, how long will it take to fill the tank?',3),(17,'What comes next in the series: 2, 6, 12, 20, 30, ?',3),(16,'What is 25% of 240?',3),(18,'What is the value of (12 × 8) ÷ 4 + 5 - 3 × 2?',3),(40,'All roses are flowers. Some flowers are white. Therefore,',4),(42,'Arrange the given words in a logical order:\n(1. Seed, 2. Plant, 3. Fruit, 4. Sapling)',4),(32,'Choose the correct analogy:\nDoctor : Hospital :: Teacher : ?',4),(35,'Choose the missing term in the series:\n Q, S, U, W, ?',4),(43,'Choose the odd one out:',4),(31,'Find the odd one out:',4),(36,'Find the related pair:\n Army : Soldier :: Orchestra : ?',4),(38,'If ‘CAT’ is coded as 3120, how is ‘DOG’ coded?\n (A=1, B=2, …, Z=26; reverse multiplication rule applies)',4),(44,'If ‘LION’ is written as ‘NLOI’, how is ‘TIGER’ written?',4),(34,'If “APPLE” is coded as “ELPPA”, how is “TABLE” coded?',4),(41,'If 3 & 5 are written as 35 and 2 & 6 as 26, how is 4 & 7 written?',4),(37,'Pointing to a man, Ria says, “His only sister is my mother.” How is the man related to Ria?',4),(39,'Rearrange the words to form a meaningful sentence:\n given / problem / a / is / solved / should / be',4),(45,'What is the missing number in the series?\n1, 4, 9, 16, ?, 36',4),(33,'Which word does not belong to the group?',4),(49,'In which year did the French Revolution begin?',5),(67,'The absorption of ink by blotting paper involves',5),(58,'The Battle of Plassey was fought in which year?',5),(52,'The Suez Canal connects which two seas?',5),(55,'The term ‘Butterfly Effect’ is associated with which field of study?',5),(65,'What is the boiling point of water at sea level?',5),(48,'What is the capital of Kazakhstan?',5),(51,'What is the largest moon in the Solar System?',5),(54,'What is the national currency of South Korea?',5),(47,'Which country has the longest coastline in the world?',5),(56,'Which is the only continent without a desert?',5),(61,'Which planet is known as the Red Planet?',5),(63,'Which planet is known as the Red Planet?',5),(64,'Which planet is known as the Red Planet?',5),(53,'Who discovered the sea route to India in 1498?',5),(50,'Who is known as the \'Father of the Indian Constitution\'?',5),(46,'Who was the first Indian to win a Nobel Prize?',5),(57,'Who was the first woman to travel into space?',5),(60,'Who wrote the play \'Romeo and Juliet\'?',5),(69,'test question new edited from ui',10);
/*!40000 ALTER TABLE `admin_app_testquestion` ENABLE KEYS */;
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
