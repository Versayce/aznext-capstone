import express from "express";
import { PrismaClient } from "../generated/prisma/index.js";

const router = express.Router();
const prisma = new PrismaClient();

// GET all products
router.get("/", async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

// POST create product
router.post("/", async (req, res) => {
  const { name, description, price, inStock } = req.body;
  const newProduct = await prisma.product.create({ data: { name, description, price, inStock } });
  res.status(201).json(newProduct);
});

export default router;
