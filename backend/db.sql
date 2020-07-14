-- \d to list all table
-- CREATE DATABASE to Create Tables
-- https://www.postgresqltutorial.com/
CREATE DATABASE stockapp;

CREATE TABLE users(
    user_id serial PRIMARY KEY,
	username VARCHAR (50) UNIQUE NOT NULL,
	password VARCHAR (50) NOT NULL,
	email VARCHAR (355) UNIQUE NOT NULL,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE stock(
    user_id INT,
    ticker VARCHAR (50),
    stock_id serial
);

INSERT INTO stock (user_id, ticker, stock_id) VALUES (2, 'hello', 2);
INSERT INTO users (username, password, email) VALUES (myname, sugar, ee@e.com);