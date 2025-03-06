import { AppDataSource } from "../data-source";
import { Sales } from "../entities/Sales";
import { Repository } from "typeorm";

export class SalesService {
    private salesRepository: Repository<Sales>;

    constructor() {
        this.salesRepository = AppDataSource.getRepository(Sales);
    }

    async createSale(saleData: Partial<Sales>): Promise<Sales> {
        console.log('salesss ', saleData);
        const sale = this.salesRepository.create(saleData);
        return await this.salesRepository.save(sale);
    }

    async getAllSales(): Promise<Sales[]> {
        return await this.salesRepository.find();
    }

    async getSaleById(id: number): Promise<Sales | null> {
        return await this.salesRepository.findOneBy({ id });
    }

    async updateSale(id: number, saleData: Partial<Sales>): Promise<void> {
        await this.salesRepository.update(id, saleData);
    }

    async deleteSale(id: number): Promise<void> {
        await this.salesRepository.delete(id);
    }
}
