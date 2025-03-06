import { Request, Response } from "express";
import { SalesService } from "../services/sales.service";

export class SalesController {
    private salesService: SalesService;

    constructor() {
        this.salesService = new SalesService();
    }

    async createSale(req: Request, res: Response): Promise<Response> {
        try {
            const sale = await this.salesService.createSale(req.body);
            return res.status(201).json(sale);
        } catch (error) {
            console.error("Error creating sale:", error);
            return res.status(400).json({ message: "Bad Request: Failed to create sale", error });
        }
    }

    async getAllSales(req: Request, res: Response): Promise<Response> {
        try {
            const sales = await this.salesService.getAllSales();
            return res.status(200).json(sales);
        } catch (error) {
            console.error("Error fetching sales:", error);
            return res.status(500).json({ message: "Internal Server Error: Failed to fetch sales", error });
        }
    }

    async getSaleById(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: "Bad Request: Invalid sale ID" });
            }

            const sale = await this.salesService.getSaleById(id);
            if (!sale) {
                return res.status(404).json({ message: "Not Found: Sale not found" });
            }

            return res.status(200).json(sale);
        } catch (error) {
            console.error("Error fetching sale by ID:", error);
            return res.status(500).json({ message: "Internal Server Error: Failed to fetch sale", error });
        }
    }

    async updateSale(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: "Bad Request: Invalid sale ID" });
            }

            await this.salesService.updateSale(id, req.body);
            return res.status(200).json({ message: "Sale updated successfully" });
        } catch (error) {
            console.error("Error updating sale:", error);
            return res.status(400).json({ message: "Bad Request: Failed to update sale", error });
        }
    }

    async deleteSale(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: "Bad Request: Invalid sale ID" });
            }

            await this.salesService.deleteSale(id);
            return res.status(200).json({ message: "Sale deleted successfully" });
        } catch (error) {
            console.error("Error deleting sale:", error);
            return res.status(500).json({ message: "Internal Server Error: Failed to delete sale", error });
        }
    }
}
