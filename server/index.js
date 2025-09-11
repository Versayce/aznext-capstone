import express from "express";
import productsRouter from "./routes/products.js";

const app = express();
app.use(express.json());

app.use("/api/products", productsRouter);

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
