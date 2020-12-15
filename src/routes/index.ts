import { Router, Request, Response } from "express";

import * as zombiesRoute from './zombies';

const router: Router = Router();

router.use("/zombies", zombiesRoute.router);

export default router;
