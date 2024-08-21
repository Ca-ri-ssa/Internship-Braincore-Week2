import express, { type Request, type Response } from "express";
import route from './route';

const PORT = 3000;

const app = express();

app.use(route);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});