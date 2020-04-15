DROP DATABASE IF EXISTS bamazon;

CREATE database bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INT(4) NOT NULL,
	product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(100) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INT(20) NOT NULL,
	PRIMARY KEY (item_id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) 
VALUES (123, "sandals", "shoes", 89.99, 25),
	   (456, "jerseys", "clothing", 59.99, 10),
	   (789, "heels", "shoes", 59.99, 50),
	   (420, "sweaters", "clothing", 29.99, 45),
	   (120, "pants", "clothing", 39.99, 15),
	   (609, "shorts", "clothing", 19.99, 19),
	   (720, "earrings", "jewelry", 49.99, 11),
	   (808, "necklaces", "jewelry", 69.99, 10),
	   (913, "bats", "sport", 9.99, 19),
	   (109, "basketball", "sport", 19.99, 27)
CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NOT NULL,
  over_head_costs DECIMAL(7,2) NOT NULL DEFAULT '0.00',
  total_sales DECIMAL(7,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (department_id)
);
Select * From departments;

ALTER TABLE products ADD COLUMN product_sales DECIMAL(7,2) DEFAULT '0.00';