import { getConnection } from "../db/connection.js";
import argon2 from "argon2";

async function createDB() {
    const con = getConnection();


    // Drop tables if exist
    await con.query("DROP TABLE IF EXISTS contact");
    await con.query("DROP TABLE IF EXISTS shopping_cart");
    await con.query("DROP TABLE IF EXISTS wishlist");
    await con.query("DROP TABLE IF EXISTS users");
    await con.query("DROP TABLE IF EXISTS roles");
    await con.query("DROP TABLE IF EXISTS books");

    // Create tables


    await con.query(`CREATE TABLE roles(
      role_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
      role VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);



    await con.query(`CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
role_id INT NOT NULL DEFAULT 2,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (role_id) REFERENCES roles(role_id)

);


`); await con.query("DROP TABLE IF EXISTS shopping_cart");
    await con.query(`CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    genre VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL, 
    image_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    stock INT NOT NULL DEFAULT 0
);`);








    await con.query(`CREATE TABLE wishlist (
  id INT AUTO_INCREMENT PRIMARY KEY, 
  user_id INT NOT NULL, 
  book_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
);`);



    await con.query(`CREATE TABLE contact (
        id INT AUTO_INCREMENT PRIMARY KEY, 
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
    );`);


    // Update users table

    // await con.query("ALTER TABLE users ADD COLUMN role_id INT NOT NULL DEFAULT 2,ADD FOREIGN KEY(role_id) REFERENCES user_roles(id)");

    await con.query("ALTER TABLE users ADD FOREIGN KEY (role_id) REFERENCES roles(role_id)");
    await con.query("ALTER TABLE users ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP");









    // Insert default roles
    await con.query(`INSERT INTO roles (role) VALUES ('admin'), ('user')`);

    // Close the connection

    const adminPassword = await argon2.hash('admin_password');
    const userPassword = await argon2.hash('user_password');



    await con.query(
        `INSERT INTO users (username, email, password, role_id) VALUES (?, ?,  ?, ?), (?, ?, ?, ?)`,
        ['admin', 'admin@example.com', adminPassword, 1, 'user', 'user@example.com', userPassword, 2]
    );


    // Insert example books
    await con.query(
        `INSERT INTO books (title, author, genre, description, price, image_url, stock) VALUES (?, ?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?, ?)`,
        ['Book1', 'Author1', 'Genre1', '', 10.99, 'book1.jpg', 10, 'Book2', 'Author2', 'Genre2', '', 20.99, 'book2.jpg', 20, 'Book3', 'Author3', 'Genre3', '', 15.99, 'book3.jpg', 15]
    );




    // Close the connection
    con.end();
}

try {
    await createDB();
} catch (err) {
    console.error(err);
}
