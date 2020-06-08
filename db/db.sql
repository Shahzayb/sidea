-- Adminer 4.7.7 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP DATABASE IF EXISTS `sidea`;
CREATE DATABASE `sidea` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sidea`;

DROP TABLE IF EXISTS `Feature`;
CREATE TABLE `Feature` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(300) NOT NULL,
  `body` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `ideaId` int unsigned NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `ideaId` (`ideaId`),
  CONSTRAINT `Feature_ibfk_1` FOREIGN KEY (`ideaId`) REFERENCES `Idea` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `Idea`;
CREATE TABLE `Idea` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(300) NOT NULL,
  `body` mediumtext NOT NULL,
  `userId` int unsigned NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `Idea_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `Like`;
CREATE TABLE `Like` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `ideaId` int unsigned NOT NULL,
  `userId` int unsigned NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `ideaId` (`ideaId`),
  KEY `userId` (`userId`),
  CONSTRAINT `Like_ibfk_1` FOREIGN KEY (`ideaId`) REFERENCES `Idea` (`id`) ON DELETE CASCADE,
  CONSTRAINT `Like_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `Save`;
CREATE TABLE `Save` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `userId` int unsigned NOT NULL,
  `ideaId` int unsigned NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `ideaId` (`ideaId`),
  CONSTRAINT `Save_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE,
  CONSTRAINT `Save_ibfk_2` FOREIGN KEY (`ideaId`) REFERENCES `Idea` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `Tag`;
CREATE TABLE `Tag` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `value` varchar(30) NOT NULL,
  `ideaId` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ideaId` (`ideaId`),
  CONSTRAINT `Tag_ibfk_1` FOREIGN KEY (`ideaId`) REFERENCES `Idea` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `User`;
CREATE TABLE `User` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` char(60) NOT NULL,
  `email` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- 2020-06-07 09:07:31