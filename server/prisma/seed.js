// prisma/seed.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding car shop services and work orders...");

  await prisma.workOrderItem.deleteMany();
  await prisma.workOrder.deleteMany();
  await prisma.service.deleteMany();

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

  const allServices = await prisma.service.findMany();

  const getServiceId = (name) => allServices.find((s) => s.name === name).id;

  const workOrder1 = await prisma.workOrder.create({
    data: {
      customerName: "John Doe",
      customerEmail: "john.doe@example.com", 
      comments: "Please prioritize the oil change. Thanks!",
      items: {
        create: [
          { serviceId: getServiceId("Oil Change"), quantity: 1 },
          { serviceId: getServiceId("Performance Tuning"), quantity: 1 },
        ],
      },
    },
  });

  const workOrder2 = await prisma.workOrder.create({
    data: {
      customerName: "Jane Smith",
      customerEmail: "jane.smith@example.com",
      comments: "Please inspect trailing arms and bushings as well. Front cv-axles have torn boots that need replacing as well.",
      items: {
        create: [
          { serviceId: getServiceId("Track Inspection"), quantity: 1 },
          { serviceId: getServiceId("Wheel Alignment"), quantity: 1 },
          { serviceId: getServiceId("Suspension Tuning"), quantity: 1 },
        ],
      },
    },
  });

  const workOrder3 = await prisma.workOrder.create({
    data: {
      customerName: "Alice Johnson",
      customerEmail: "ajohn@gmail.com",
      comments: "Need brake maintenance before my next track day. Get me a set of grippy tires installed as well.",
      items: {
        create: [
          { serviceId: getServiceId("Brake Maintenance"), quantity: 1 },
          { serviceId: getServiceId("Tire Mounting & Balancing"), quantity: 1 },
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
