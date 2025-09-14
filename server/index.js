import express from "express";
import cors from "cors";
import servicesRouter from "./routes/services.js";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());
app.use("/api/services", servicesRouter);

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
