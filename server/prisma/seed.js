// prisma/seed.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding car shop services and work orders...");

  // Delete in the right order to avoid foreign key issues
  await prisma.workOrderItem.deleteMany();
  await prisma.workOrder.deleteMany();
  await prisma.service.deleteMany();

  // Create services
  const services = await prisma.service.createMany({
    data: [
      { name: "Oil Change", description: "Full synthetic oil change with filter replacement", price: 89.99, inStock: true },
      { name: "Performance Tuning", description: "Custom ECU remapping and dyno tuning for max performance", price: 499.99, inStock: true },
      { name: "Track Inspection", description: "Pre-track safety inspection covering brakes, fluids, and tires", price: 149.99, inStock: true },
      { name: "Wheel Alignment", description: "Precision 4-wheel alignment for optimal handling and tire life", price: 129.99, inStock: true },
      { name: "Suspension Tuning", description: "Custom coilover adjustment and corner balancing for track use", price: 299.99, inStock: true },
      { name: "Brake Maintenance", description: "High-performance brake pads and rotor installation", price: 399.99, inStock: true },
      { name: "Tire Mounting & Balancing", description: "Mounting and balancing of performance tires", price: 99.99, inStock: true },
      { name: "Diagnostic Scan", description: "OBD-II diagnostic scan with troubleshooting report", price: 59.99, inStock: true },
    ],
  });

  // Fetch created services with IDs
  const allServices = await prisma.service.findMany();

  const getServiceId = (name) => allServices.find((s) => s.name === name).id;

  // Create first work order
  const workOrder1 = await prisma.workOrder.create({
    data: {
      customerName: "John Doe",
      items: {
        create: [
          { serviceId: getServiceId("Oil Change"), quantity: 1 },
          { serviceId: getServiceId("Performance Tuning"), quantity: 1 },
        ],
      },
    },
  });

  // Create second work order
  const workOrder2 = await prisma.workOrder.create({
    data: {
      customerName: "Jane Smith",
      items: {
        create: [
          { serviceId: getServiceId("Track Inspection"), quantity: 1 },
          { serviceId: getServiceId("Wheel Alignment"), quantity: 1 },
          { serviceId: getServiceId("Suspension Tuning"), quantity: 1 },
        ],
      },
    },
  });

  console.log("Seeding completed!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
