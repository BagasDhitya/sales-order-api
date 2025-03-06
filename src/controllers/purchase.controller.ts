import { Request, Response } from "express";
import { PurchaseService } from "../services/purchase.service";

export class PurchaseController {
    private purchaseService: PurchaseService;

    constructor() {
        this.purchaseService = new PurchaseService();
    }

    async createPurchase(req: Request, res: Response): Promise<Response> {
        try {
            const purchase = await this.purchaseService.createPurchase(req.body);
            return res.status(201).json(purchase);
        } catch (error) {
            console.error("Error creating purchase:", error);
            return res.status(400).json({ message: "Bad Request: Failed to create purchase", error });
        }
    }

    async getAllPurchases(req: Request, res: Response): Promise<Response> {
        try {
            const purchases = await this.purchaseService.getAllPurchases();
            return res.status(200).json(purchases);
        } catch (error) {
            console.error("Error fetching purchases:", error);
            return res.status(500).json({ message: "Internal Server Error: Failed to fetch purchases", error });
        }
    }

    async getPurchaseById(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: "Bad Request: Invalid purchase ID" });
            }

            const purchase = await this.purchaseService.getPurchaseById(id);
            if (!purchase) {
                return res.status(404).json({ message: "Not Found: Purchase not found" });
            }

            return res.status(200).json(purchase);
        } catch (error) {
            console.error("Error fetching purchase by ID:", error);
            return res.status(500).json({ message: "Internal Server Error: Failed to fetch purchase", error });
        }
    }

    async updatePurchase(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: "Bad Request: Invalid purchase ID" });
            }

            await this.purchaseService.updatePurchase(id, req.body);
            return res.status(200).json({ message: "Purchase updated successfully" });
        } catch (error) {
            console.error("Error updating purchase:", error);
            return res.status(400).json({ message: "Bad Request: Failed to update purchase", error });
        }
    }

    async deletePurchase(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: "Bad Request: Invalid purchase ID" });
            }

            await this.purchaseService.deletePurchase(id);
            return res.status(200).json({ message: "Purchase deleted successfully" });
        } catch (error) {
            console.error("Error deleting purchase:", error);
            return res.status(500).json({ message: "Internal Server Error: Failed to delete purchase", error });
        }
    }
}
