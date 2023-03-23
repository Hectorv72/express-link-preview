import { Request, Response } from "express";

const router = require('express').Router();

router.use('/', (req: Request, res: Response) => res.send('connected'));

module.exports = router;
