import Elysia from "elysia";
import { staticPlugin } from "@elysiajs/static";
import path from "path";

const meta = import.meta;

const app = new Elysia()
    .use(staticPlugin({
        assets: path.join(meta.dir, "public"),
        prefix: "/"
    }))
    .get("/home", () => Bun.file("./public/index.html"))


export default app;