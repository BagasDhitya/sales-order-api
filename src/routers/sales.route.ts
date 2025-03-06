import { Router } from "express";
import { SalesController } from "../controllers/sales.controller";

export class SalesRoutes {
    public router: any;
    private salesController: SalesController;

    constructor() {
        this.router = Router();
        this.salesController = new SalesController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post("/", this.salesController.createSale.bind(this.salesController));
        this.router.get("/", this.salesController.getAllSales.bind(this.salesController));
        this.router.get("/:id", this.salesController.getSaleById.bind(this.salesController));
        this.router.put("/:id", this.salesController.updateSale.bind(this.salesController));
        this.router.delete("/:id", this.salesController.deleteSale.bind(this.salesController));
    }
}
