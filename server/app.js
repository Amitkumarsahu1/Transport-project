import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import truckRoutes from "./routes/truckRoutes.js";
import driverRoutes from "./routes/driverRoutes.js";
import shipmentRoutes from "./routes/shipmentRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import maintenanceRoutes from "./routes/maintenanceRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/trucks", truckRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/shipments", shipmentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/maintenance",maintenanceRoutes);
app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});