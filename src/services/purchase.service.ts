import { AppDataSource } from "../data-source";
import { Purchases } from "../entities/Purchases";
import { Repository } from "typeorm";

export class PurchaseService {
    private purchaseRepository: Repository<Purchases>;

    constructor() {
        this.purchaseRepository = AppDataSource.getRepository(Purchases);
    }

    async createPurchase(purchaseData: Partial<Purchases>): Promise<Purchases> {
        const purchase = this.purchaseRepository.create(purchaseData);
        return await this.purchaseRepository.save(purchase);
    }

    async getAllPurchases(): Promise<Purchases[]> {
        return await this.purchaseRepository.find();
    }

    async getPurchaseById(id: number): Promise<Purchases | null> {
        return await this.purchaseRepository.findOneBy({ id });
    }

    async updatePurchase(id: number, purchaseData: Partial<Purchases>): Promise<void> {
        await this.purchaseRepository.update(id, purchaseData);
    }

    async deletePurchase(id: number): Promise<void> {
        await this.purchaseRepository.delete(id);
    }
}
