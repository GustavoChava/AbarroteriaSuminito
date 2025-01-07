-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: suminito
-- ------------------------------------------------------
-- Server version	8.4.3

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
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `idProducto` int NOT NULL AUTO_INCREMENT,
  `nombreProducto` varchar(60) NOT NULL,
  `canastaBasica` bit(1) DEFAULT b'0',
  `descripcion` text,
  `categoria` int DEFAULT NULL,
  `precioUnd` decimal(10,2) NOT NULL,
  `precioMay` decimal(10,2) NOT NULL,
  `fechaVencimiento` date DEFAULT NULL,
  `estado` bit(1) DEFAULT b'1',
  `isr` double DEFAULT NULL,
  `imgPresentacion` varchar(355) DEFAULT NULL,
  `fechaCreacion` date DEFAULT NULL,
  PRIMARY KEY (`idProducto`),
  KEY `categoria` (`categoria`),
  CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`categoria`) REFERENCES `categoria` (`idCategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,'Leche Entera',_binary '','Leche entera pasteurizada',1,25.00,23.00,'2025-01-31',_binary '',NULL,'leche_entera.jpg',NULL),(2,'Carne de Res',_binary '','Carne de res fresca',2,150.00,140.00,'2025-02-15',_binary '',NULL,'carne_res.jpg',NULL),(3,'Frijoles Rojos',_binary '','Frijoles rojos de alta calidad',3,20.00,18.00,NULL,_binary '',NULL,'frijoles_rojos.jpg',NULL),(4,'Arroz Blanco',_binary '','Arroz blanco 100% limpio',3,18.00,16.00,NULL,_binary '',NULL,'arroz_blanco.jpg',NULL),(5,'Azúcar Refinada',_binary '','Azúcar refinada blanca',3,22.00,20.00,NULL,_binary '',NULL,'azucar_refinada.jpg',NULL),(6,'Banano',_binary '','Banano maduro fresco',4,5.00,4.00,'2025-01-10',_binary '',NULL,'banano.jpg',NULL),(7,'Papa',_binary '','Papa fresca por libra',5,10.00,9.00,NULL,_binary '',NULL,'papa.jpg',NULL),(8,'Jugo Natural',_binary '\0','Jugo natural sabor naranja',6,30.00,28.00,'2025-03-01',_binary '',NULL,'jugo_natural.jpg',NULL),(9,'Detergente en Polvo',_binary '\0','Detergente para ropa',7,50.00,45.00,NULL,_binary '',NULL,'detergente.jpg',NULL),(10,'Shampoo',_binary '\0','Shampoo para cabello',8,60.00,55.00,NULL,_binary '',NULL,'shampoo.jpg',NULL),(11,'Pan Blanco',_binary '','Pan blanco suave',9,15.00,13.00,'2025-02-05',_binary '',NULL,'pan_blanco.jpg',NULL),(12,'Salchichas',_binary '\0','Salchichas empacadas',10,35.00,32.00,'2025-01-25',_binary '',NULL,'salchichas.jpg',NULL),(13,'Aceite Vegetal',_binary '','Aceite vegetal comestible',3,55.00,50.00,NULL,_binary '',NULL,'aceite_vegetal.jpg',NULL),(14,'Queso Fresco',_binary '','Queso fresco artesanal',1,75.00,70.00,'2025-01-20',_binary '',NULL,'queso_fresco.jpg',NULL),(15,'Pollo Entero',_binary '','Pollo entero fresco',2,120.00,110.00,'2025-01-18',_binary '',NULL,'pollo_entero.jpg',NULL),(16,'Manzanas',_binary '\0','Manzanas importadas',4,40.00,38.00,'2025-01-30',_binary '',NULL,'manzanas.jpg',NULL),(17,'Zanahorias',_binary '','Zanahorias frescas por libra',5,12.00,10.00,'2025-01-12',_binary '',NULL,'zanahorias.jpg',NULL),(18,'Refresco de Cola',_binary '\0','Refresco gaseoso sabor cola',6,35.00,32.00,'2025-05-01',_binary '',NULL,'refresco_cola.jpg',NULL),(19,'Jabón de Baño',_binary '\0','Jabón para baño corporal',8,25.00,23.00,NULL,_binary '',NULL,'jabon_bano.jpg',NULL),(20,'Pan Integral',_binary '\0','Pan integral saludable',9,18.00,16.00,'2025-03-01',_binary '',NULL,'pan_integral.jpg',NULL),(21,'Chorizos',_binary '\0','Chorizos frescos artesanales',10,60.00,55.00,'2025-01-22',_binary '',NULL,'chorizos.jpg',NULL),(22,'Lentejas',_binary '','Lentejas seleccionadas',3,22.00,20.00,NULL,_binary '',NULL,'lentejas.jpg',NULL),(23,'Yogurt Natural',_binary '\0','Yogurt natural sin azúcar',1,35.00,30.00,'2025-02-10',_binary '',NULL,'yogurt_natural.jpg',NULL),(24,'Costilla de Cerdo',_binary '','Costilla de cerdo fresca',2,145.00,135.00,'2025-02-05',_binary '',NULL,'costilla_cerdo.jpg',NULL),(25,'Sandía',_binary '\0','Sandía fresca por unidad',4,50.00,45.00,'2025-01-28',_binary '',NULL,'sandia.jpg',NULL),(26,'Cebolla',_binary '','Cebolla blanca por libra',5,15.00,12.00,NULL,_binary '',NULL,'cebolla.jpg',NULL),(27,'Té Frío',_binary '\0','Bebida fría sabor té',6,28.00,25.00,'2025-06-01',_binary '',NULL,'te_frio.jpg',NULL),(28,'Desinfectante',_binary '\0','Desinfectante multiusos',7,40.00,38.00,NULL,_binary '',NULL,'desinfectante.jpg',NULL),(29,'Crema Dental',_binary '\0','Crema dental fluorada',8,35.00,30.00,NULL,_binary '',NULL,'crema_dental.jpg',NULL),(30,'Pan de Ajo',_binary '\0','Pan de ajo artesanal',9,25.00,23.00,'2025-02-15',_binary '',NULL,'pan_ajo.jpg',NULL),(31,'Mortadela',_binary '\0','Mortadela de res',10,70.00,65.00,'2025-01-25',_binary '',NULL,'mortadela.jpg',NULL);
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-07 15:17:39
