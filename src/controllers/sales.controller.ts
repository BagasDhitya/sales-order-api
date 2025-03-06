import { Request, Response } from "express";
import { createSale, getAllSales, getSaleById, deleteSale } from "../services/sales.service";

function createSaleHandler(req: Request, res: Response) {
    const { productName, price, quantity } = req.body;
    createSale(productName, price, quantity)
        .then((sale) => res.status(201).json(sale))
        .catch((err) => res.status(500).json({ message: err.message }));
}

function getSalesHandler(req: Request, res: Response) {
    getAllSales()
        .then((sales) => res.status(200).json(sales))
        .catch((err) => res.status(500).json({ message: err.message }));
}

function getSaleByIdHandler(req: Request, res: Response) {
    const id = Number(req.params.id);
    getSaleById(id)
        .then((sale) => {
            if (!sale) return res.status(404).json({ message: "Sale not found" });
            res.status(200).json(sale);
        })
        .catch((err) => res.status(500).json({ message: err.message }));
}

function deleteSaleHandler(req: Request, res: Response) {
    const id = Number(req.params.id);
    deleteSale(id)
        .then(() => res.status(200).json({ message: "Sale deleted successfully" }))
        .catch((err) => res.status(500).json({ message: err.message }));
}

export { createSaleHandler, getSalesHandler, getSaleByIdHandler, deleteSaleHandler };
