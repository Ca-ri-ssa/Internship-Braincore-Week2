import { Database } from "bun:sqlite";

const db = new Database("bagian9.sqlite");

// db.run("CREATE TABLE IF NOT EXISTS products(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price NUMBER)");

const products = db.query("INSERT INTO products(name, price) VALUES(:name, :price) RETURNING id").get("Apple", 13000);
console.log(products)
