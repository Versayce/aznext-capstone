import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const workOrders = await prisma.workOrder.findMany({
      include: {
        items: { include: { service: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    res.json(workOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch work orders" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const workOrder = await prisma.workOrder.findUnique({
      where: { id: Number(id) },
      include: { items: { include: { service: true } } },
    });
    if (!workOrder) return res.status(404).json({ error: "Work order not found" });
    res.json(workOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch work order" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { customerName, customerEmail, comments, items } = req.body;

    if (!customerName || !customerEmail || !items || items.length === 0) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const workOrder = await prisma.workOrder.create({
      data: {
        customerName,
        customerEmail,
        comments,
        items: {
          create: items.map(i => ({
            serviceId: i.serviceId,
            quantity: i.quantity,
          })),
        },
      },
      include: { items: { include: { service: true } } },
    });

    res.status(201).json(workOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create work order" });
  }
});

router.patch("/:id/complete", async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await prisma.workOrder.update({
      where: { id: Number(id) },
      data: { status: "Completed" },
    });
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to complete work order" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.workOrderItem.deleteMany({ where: { workOrderId: Number(id) } });
    await prisma.workOrder.delete({ where: { id: Number(id) } });
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete work order" });
  }
});

router.delete("/:id/items/:itemId", async (req, res) => {
  try {
    const { itemId } = req.params;
    await prisma.workOrderItem.delete({ where: { id: Number(itemId) } });
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete work order item" });
  }
});

export default router;
