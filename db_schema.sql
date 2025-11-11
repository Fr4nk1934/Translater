-- Esquema de la base de datos para Translater
-- Ejecuta este archivo en tu servidor MySQL para crear la base de datos y la tabla

CREATE DATABASE IF NOT EXISTS translator_db;
USE translator_db;

CREATE TABLE IF NOT EXISTS words (
  id INT AUTO_INCREMENT PRIMARY KEY,
  spanish VARCHAR(255) NOT NULL,
  english VARCHAR(255) NOT NULL
);

-- Inserta algunos datos de ejemplo (opcional)
INSERT INTO words (spanish, english) VALUES
('hola', 'hello'),
('adiós', 'goodbye'),
('gracias', 'thank you'),
('por favor', 'please'),
('sí', 'yes'),
('no', 'no');
