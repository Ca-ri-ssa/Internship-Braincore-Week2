import express, { type Request, type Response } from "express";
import path  from 'path';

const meta = import.meta;

const router = express.Router();

router.use(express.static(path.join(meta.dir, "public")))
router.use(express.urlencoded({ extended: true }));

router.get('/', async (req: Request, res: Response) => {
    res.sendFile(path.join(meta.dir, "./public/views/index.html"));
});

router.post('/data', async (req: Request, res: Response) => {
    res.send(req.method + " request received.");
    console.log(req.body);
});

export default router;