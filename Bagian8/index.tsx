import{ Elysia } from "elysia";
import route from "./route";

const app = new Elysia()
    .use(route)
    .get("/", (context) => "welcome to " + context.request.url)
    .listen(3000);

console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`)