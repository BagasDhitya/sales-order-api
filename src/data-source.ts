import { DataSource } from "typeorm";
import { Sales } from "./entities/Sales";
import { Purchases } from "./entities/Purchases";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: true,
    entities: [Sales, Purchases],
});
