import express from "express";
import { AppDataSource } from "./data-source";
import salesRoutes from "./routers/sales.route";
import purchaseRoutes from "./routers/purchase.route";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/sales", salesRoutes);
app.use("/purchases", purchaseRoutes);

AppDataSource.initialize()
    .then(() => {
        app.listen(3000, () => console.log("Server running on port 3000"));
    })
    .catch((err) => console.error("Database connection error:", err));
