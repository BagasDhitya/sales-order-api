import { Router } from "express";
import { PurchaseController } from "../controllers/purchase.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class PurchaseRoutes {
    public router: any;
    private purchaseController: PurchaseController;
    private authMiddleware: AuthMiddleware

    constructor() {
        this.router = Router();
        this.purchaseController = new PurchaseController();
        this.authMiddleware = new AuthMiddleware()
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post("/", this.authMiddleware.authenticateUser, this.purchaseController.createPurchase.bind(this.purchaseController));
        this.router.get("/", this.authMiddleware.authenticateUser, this.authMiddleware.authorizeRole('admin'), this.purchaseController.getAllPurchases.bind(this.purchaseController));
        this.router.get("/:id", this.authMiddleware.authenticateUser, this.authMiddleware.authorizeRole('admin'), this.purchaseController.getPurchaseById.bind(this.purchaseController));
        this.router.put("/:id", this.authMiddleware.authenticateUser, this.authMiddleware.authorizeRole('admin'), this.purchaseController.updatePurchase.bind(this.purchaseController));
        this.router.delete("/:id", this.authMiddleware.authenticateUser, this.authMiddleware.authorizeRole('admin'), this.purchaseController.deletePurchase.bind(this.purchaseController));
    }
}
