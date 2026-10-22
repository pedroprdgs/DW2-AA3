import { Router } from "express";
import * as relatorioController from "../controllers/controllerRelatorio.js";

const router = Router();

router.get("/performance", relatorioController.performance);

export default router;