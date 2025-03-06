import { Router } from "express";
import { PurchaseController } from "../controllers/purchase.controller";

export class PurchaseRoutes {
    public router: any;
    private purchaseController: PurchaseController;

    constructor() {
        this.router = Router();
        this.purchaseController = new PurchaseController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post("/", this.purchaseController.createPurchase.bind(this.purchaseController));
        this.router.get("/", this.purchaseController.getAllPurchases.bind(this.purchaseController));
        this.router.get("/:id", this.purchaseController.getPurchaseById.bind(this.purchaseController));
        this.router.put("/:id", this.purchaseController.updatePurchase.bind(this.purchaseController));
        this.router.delete("/:id", this.purchaseController.deletePurchase.bind(this.purchaseController));
    }
}
