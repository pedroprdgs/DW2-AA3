import { Router } from "express";
import * as vendaController from "../controllers/controllerVendas.js";

const router = Router();

router.get("/", vendaController.listar);
router.get("/vendedor/:id", vendaController.consultarPorVendedor);
router.get("/regiao/:id", vendaController.consultarPorRegiao);
router.post("/", vendaController.registrar);
router.delete("/:id", vendaController.excluir);

export default router;