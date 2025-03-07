import { AppDataSource } from "../../src/data-source";
import { Sales } from "../entities/Sales";
import { Purchases } from "../entities/Purchases";

export class ProfitService {
    async calculateGrossProfit() {
        const saleRepository = AppDataSource.getRepository(Sales);
        const purchaseRepository = AppDataSource.getRepository(Purchases);

        const totalSales = await saleRepository
            .createQueryBuilder("sale")
            .select("SUM(sale.totalAmount)", "total")
            .getRawOne();

        const totalPurchases = await purchaseRepository
            .createQueryBuilder("purchase")
            .select("SUM(purchase.totalAmount)", "total")
            .getRawOne();

        const salesTotal = totalSales.total ? parseFloat(totalSales.total) : 0;
        const purchasesTotal = totalPurchases.total ? parseFloat(totalPurchases.total) : 0;

        const grossProfit = salesTotal - purchasesTotal;

        return {
            totalSales: salesTotal,
            totalPurchases: purchasesTotal,
            grossProfit: grossProfit,
        };
    }
}
