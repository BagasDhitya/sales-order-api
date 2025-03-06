import express from "express";
import { createPurchaseHandler, getPurchasesHandler, getPurchaseByIdHandler, deletePurchaseHandler } from "../controllers/purchase.controller";

const router = express.Router();

router.post("/", createPurchaseHandler);
router.get("/", getPurchasesHandler);
router.get("/:id", getPurchaseByIdHandler);
router.delete("/:id", deletePurchaseHandler);

export default router;
