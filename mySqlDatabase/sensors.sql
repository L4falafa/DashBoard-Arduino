DROP DATABASE IF EXISTS arduino;
CREATE DATABASE IF NOT EXISTS arduino;
USE arduino;

CREATE TABLE objetos (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre_objeto varchar(255) DEFAULT NULL
);

CREATE TABLE sensores (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre_sensor varchar(255) DEFAULT NULL,
  tipo_dato varchar(255) DEFAULT NULL,
  id_objeto int DEFAULT NULL,
  piso int DEFAULT NULL,
  FOREIGN KEY (id_objeto) REFERENCES objetos (id) ON DELETE CASCADE  
);

CREATE TABLE datos_sensores (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  id_sensor int DEFAULT NULL,
  dato double(11,7) DEFAULT NULL,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (id_sensor) REFERENCES sensores (id) ON DELETE CASCADE
);

INSERT INTO objetos (nombre_objeto) VALUES ("Sin objeto");
INSERT INTO sensores(nombre_sensor, tipo_dato, id_objeto, piso) VALUES ("dht11", "% humedad relativa", "1", "0");
INSERT INTO sensores(nombre_sensor, tipo_dato, id_objeto, piso) VALUES ("dht11", "c°", "1", "0");