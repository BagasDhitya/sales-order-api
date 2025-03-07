import { Request, Response } from "express";
import { ProfitService } from "../services/profit.service";

export class ProfitController {
    private profitService: ProfitService;

    constructor() {
        this.profitService = new ProfitService();
    }

    async getGrossProfit(req: Request, res: Response) {
        try {
            const profitData = await this.profitService.calculateGrossProfit();
            return res.status(200).json(profitData);
        } catch (error) {
            return res.status(500).json({ message: "Terjadi kesalahan", error: error });
        }
    }
}
