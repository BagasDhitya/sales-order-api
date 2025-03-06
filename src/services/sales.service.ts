import { AppDataSource } from "../data-source";
import { Sales } from "../entities/Sales";

const salesRepository = AppDataSource.getRepository(Sales);

function createSale(saleData: Partial<Sales>) {
    const sale = salesRepository.create(saleData);
    return salesRepository.save(sale);
}

function getAllSales() {
    return salesRepository.find();
}

function getSaleById(id: number) {
    return salesRepository.findOneBy({ id });
}

function updateSale(id: number, saleData: Partial<Sales>) {
    return salesRepository.update(id, saleData);
}

function deleteSale(id: number) {
    return salesRepository.delete(id);
}

export { createSale, getAllSales, getSaleById, updateSale, deleteSale };
