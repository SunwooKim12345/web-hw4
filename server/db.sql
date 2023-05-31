CREATE mydb;

USE mydb;

CREATE TABLE notes (
	id int NOT NULL AUTO_INCREMENT,
	text varchar(255),
	lastUpdatedDate varchar(255),
	userEmail varchar(255),
	Primary key(id)
);

CREATE TABLE users (
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255),
	email varchar(255),
	colorScheme varchar(255) DEFAULT 'light',
	image TEXT,
	password varchar(255),
	Primary key(id)
);

INSERT INTO users (name, email) VALUES ('sunwoo', 'sunwoo.kim.2@stonybrook.edu'); 




