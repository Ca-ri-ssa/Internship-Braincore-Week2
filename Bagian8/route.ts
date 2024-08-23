import Elysia from "elysia";
import { staticPlugin } from "@elysiajs/static";
import html from "@elysiajs/html";

const app = new Elysia()
    .use(html())
    .use(staticPlugin({
        prefix: "/"
    }))
    .get("/index", () => Bun.file("./public/index.html"))
    .get("/home", () => Bun.file("./public/home.html"))


export default app;