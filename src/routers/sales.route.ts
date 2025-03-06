import express from "express";
import { createSaleHandler, getSalesHandler, getSaleByIdHandler, deleteSaleHandler } from "../controllers/sales.controller";

const router = express.Router();

router.post("/", createSaleHandler);
router.get("/", getSalesHandler);
router.get("/:id", getSaleByIdHandler);
router.delete("/:id", deleteSaleHandler);

export default router;
