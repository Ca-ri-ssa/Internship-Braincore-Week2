import Database from "bun:sqlite"

export interface Product { 
    id?: number,
    name: string,
    price: string,
    image: string
}

export class ProductDb {
    private db: Database;

    constructor() {
        this.db = new Database("Bagian10.sqlite")
        this.createTable()
    }

    fetchAllProducts() {
        return this.db.query("SELECT * FROM products").all()
    }

    addProduct(product: Product) {
        return this.db.query(
            `INSERT INTO products(name, price, image) VALUES(?,?,?) RETURNING id`
        ).get(product.name, product.price, product.image) as Product;
    }

    updateProduct(id: number, product: Product) {
        return this.db.run(
            `UPDATE products SET name='${product.name}', price='${product.price}', image='${product.image}' WHERE id='${id}'`
        )
    }

    deleteProduct(id: number) { 
        return this.db.run(
            `DELETE FROM products WHERE id=${id}`
        )
    }

    createTable() {
        return this.db.run(
            "CREATE TABLE IF NOT EXISTS products(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price NUM, image TEXT)"
        );
    }
}