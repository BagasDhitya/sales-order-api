import express, { Application } from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source";
import { SalesRoutes } from "./routers/sales.route";
import { PurchaseRoutes } from "./routers/purchase.route";

dotenv.config();

class App {
    private app: Application;
    private port: number;

    constructor() {
        this.app = express();
        this.port = Number(process.env.PORT) || 3000;
        this.initializeMiddleware();
        this.initializeRoutes();
        this.initializeDatabase();
    }

    private initializeMiddleware(): void {
        this.app.use(express.json());
    }

    private initializeRoutes(): void {
        this.app.use("/api/sales", new SalesRoutes().router);
        this.app.use("/api/purchases", new PurchaseRoutes().router);
    }

    private async initializeDatabase(): Promise<void> {
        try {
            await AppDataSource.initialize();
            console.log("Database connected successfully");
        } catch (error) {
            console.error("Database connection error:", error);
        }
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

const app = new App()
app.listen()
