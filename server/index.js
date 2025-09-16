import express from "express";
import cors from "cors";
import servicesRouter from "./routes/services.js";
import workOrdersRouter from "./routes/workOrders.js";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());
app.use("/api/services", servicesRouter);
app.use("/api/work-orders", workOrdersRouter);

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
