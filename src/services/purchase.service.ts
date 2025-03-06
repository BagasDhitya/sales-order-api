import { AppDataSource } from "../data-source";
import { Purchase } from "../entities/Purchase";

const purchaseRepository = AppDataSource.getRepository(Purchase);

function createPurchase(supplierName: string, totalAmount: number, status: string) {
    const purchase = new Purchase();
    purchase.supplierName = supplierName;
    purchase.totalAmount = totalAmount;
    purchase.status = status;
    return purchaseRepository.save(purchase);
}

function getPurchases() {
    return purchaseRepository.find();
}

function getPurchaseById(id: number) {
    return purchaseRepository.findOneBy({ id });
}

function deletePurchase(id: number) {
    return purchaseRepository.delete(id);
}

export { createPurchase, getPurchases, getPurchaseById, deletePurchase };
