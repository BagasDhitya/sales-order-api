import { Request, Response } from "express";
import { createPurchase, getPurchases, getPurchaseById, deletePurchase } from "../services/purchase.service";

function createPurchaseHandler(req: Request, res: Response) {
    const { supplierName, totalAmount, status } = req.body;
    createPurchase(supplierName, totalAmount, status)
        .then((purchase) => res.status(201).json(purchase))
        .catch((err) => res.status(500).json({ message: err.message }));
}

function getPurchasesHandler(req: Request, res: Response) {
    getPurchases()
        .then((purchases) => res.status(200).json(purchases))
        .catch((err) => res.status(500).json({ message: err.message }));
}

function getPurchaseByIdHandler(req: Request, res: Response) {
    const id = Number(req.params.id);
    getPurchaseById(id)
        .then((purchase) => {
            if (!purchase) return res.status(404).json({ message: "Purchase not found" });
            res.status(200).json(purchase);
        })
        .catch((err) => res.status(500).json({ message: err.message }));
}

function deletePurchaseHandler(req: Request, res: Response) {
    const id = Number(req.params.id);
    deletePurchase(id)
        .then(() => res.status(200).json({ message: "Purchase deleted successfully" }))
        .catch((err) => res.status(500).json({ message: err.message }));
}

export { createPurchaseHandler, getPurchasesHandler, getPurchaseByIdHandler, deletePurchaseHandler };
