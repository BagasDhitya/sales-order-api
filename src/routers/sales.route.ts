import { Router } from "express";
import { SalesController } from "../controllers/sales.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class SalesRoutes {
    public router: any;
    private salesController: SalesController;
    private authMiddleware: AuthMiddleware

    constructor() {
        this.router = Router();
        this.salesController = new SalesController();
        this.authMiddleware = new AuthMiddleware()
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post("/", this.authMiddleware.authenticateUser, this.salesController.createSale.bind(this.salesController));
        this.router.get("/", this.authMiddleware.authenticateUser, this.authMiddleware.authorizeRole('admin'), this.salesController.getAllSales.bind(this.salesController));
        this.router.get("/:id", this.authMiddleware.authenticateUser, this.authMiddleware.authorizeRole('admin'), this.salesController.getSaleById.bind(this.salesController));
        this.router.put("/:id", this.authMiddleware.authenticateUser, this.authMiddleware.authorizeRole('admin'), this.salesController.updateSale.bind(this.salesController));
        this.router.delete("/:id", this.authMiddleware.authenticateUser, this.authMiddleware.authorizeRole('admin'), this.salesController.deleteSale.bind(this.salesController));
    }
}
