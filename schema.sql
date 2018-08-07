-- DROP DATABASE IF EXISTS bamazonDB;

-- CREATE DATABASE bamazonDB;

-- USE bamazonDB;

-- CREATE TABLE products(
--     item_id INT AUTO_INCREMENT NOT NULL,
--     product_name VARCHAR(100) NOT NULL,
--     department_name VARCHAR(100) NOT NULL,
--     price DECIMAL(10,2) NOT NULL,
--     stock_quantity INT NOT NULL,
--     product_sales DECIMAL(10,2),
--     PRIMARY KEY (item_id)
-- );

-- INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Desktop", "Electronics", 899.99, 100);
-- INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Laptop", "Electronics", 1999.99, 300);
-- INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Mouse", "Electronics", 29.99, 200);
-- INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Earphone", "Electronics", 10.00, 50);
-- INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Shower cap", "Home Goods", 0.99, 800);
-- INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Shower head", "Home Goods", 59.99, 120);
-- INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Bath towel", "Home Goods", 9.99, 500);
-- INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Bathroom rug", "Home Goods", 19.99, 100);
-- INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Lotion", "Beauty", 9.50, 200);
-- INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Perfume", "Beauty", 70.50, 100);

USE bamazonDB;

SELECT * FROM products;

-- CREATE TABLE departments(
--     department_id INT AUTO_INCREMENT NOT NULL,
--     department_name VARCHAR(100) NOT NULL,
--     over_head_costs DECIMAL(10,2) NOT NULL,
--     PRIMARY KEY (department_id)
-- );

-- INSERT INTO departments (department_name, over_head_costs) VALUES ("Electronics", 50000);
-- INSERT INTO departments (department_name, over_head_costs) VALUES ("Home Goods", 30000);
-- INSERT INTO departments (department_name, over_head_costs) VALUES ("Beauty", 10000);

-- SELECT * FROM departments;