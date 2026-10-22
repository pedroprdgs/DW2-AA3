import { Router } from "express";
import * as vendedorController from "../controllers/controllerVendedores.js";

const router = Router();

router.get("/", vendedorController.listar);
router.get("/:id", vendedorController.buscarPorId);
router.post("/", vendedorController.cadastrar);
router.put("/:id", vendedorController.atualizar);
router.patch("/:id/desativar", vendedorController.desativar);
router.patch("/:id/ativar", vendedorController.ativar);

export default router;