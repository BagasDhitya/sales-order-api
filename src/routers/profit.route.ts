import { Router } from "express";
import { ProfitController } from "../controllers/profit.controller";

export class ProfitRoutes {
    public router: any;
    private profitController: ProfitController;

    constructor() {
        this.router = Router();
        this.profitController = new ProfitController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get("/", this.profitController.getGrossProfit.bind(this.profitController));
    }
}
