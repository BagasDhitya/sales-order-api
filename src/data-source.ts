import { DataSource } from "typeorm";
import { Sales } from "./entities/Sales";
import { Purchase } from "./entities/Purchase";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: true,
    entities: [Sales, Purchase],
});
