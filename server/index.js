import express from "express";
import servicesRouter from "./routes/services.js";

const app = express();
app.use(express.json());

app.use("/api/services", servicesRouter);

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
