import { Elysia, redirect } from 'elysia';
import { html } from '@elysiajs/html'
import staticPlugin from '@elysiajs/static';
import { ProductDb, type Product } from './db';

const viewPath = "./public/views";

const app = new Elysia()
    .use(html())
    .use(staticPlugin({
        prefix: "/"
    }))
    .decorate("db", new ProductDb())
    .get('/', () => Bun.file("./public/views/home.html"))
    .get('/add-product', () => Bun.file(viewPath + "/add-product.html"))
    .get('/edit/:id', () => Bun.file(viewPath + "/edit-product.html"))

    .get('/fetch-products', ({ db }) => db.fetchAllProducts())
    .get('/script.js', () => Bun.file(import.meta.dir + "/script.js").text())

    .post('/add-product', ({ db, body, set }) => {
        db.addProduct(<Product>body);
        set.redirect = "/";
    })
    .post('/edit/:id', ({ db, body, set, params }) => {
        db.updateProduct(parseInt(params.id), <Product>body, );
        set.redirect ="/";
    })
    .listen(3000)

console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`)