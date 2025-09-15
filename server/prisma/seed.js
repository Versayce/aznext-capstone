// prisma/seed.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding car shop services...");

  // Option 1: wipe existing data (for testing/dev only!)
  await prisma.service.deleteMany();

  await prisma.service.createMany({
    data: [
      {
        name: "Oil Change",
        description: "Full synthetic oil change with filter replacement",
        price: 89.99,
        inStock: true,
      },
      {
        name: "Performance Tuning",
        description: "Custom ECU remapping and dyno tuning for max performance",
        price: 499.99,
        inStock: true,
      },
      {
        name: "Track Inspection",
        description: "Pre-track safety inspection covering brakes, fluids, and tires",
        price: 149.99,
        inStock: true,
      },
      {
        name: "Wheel Alignment",
        description: "Precision 4-wheel alignment for optimal handling and tire life",
        price: 129.99,
        inStock: true,
      },
      {
        name: "Suspension Tuning",
        description: "Custom coilover adjustment and corner balancing for track use",
        price: 299.99,
        inStock: true,
      },
      {
        name: "Brake Maintenance",
        description: "High-performance brake pads and rotor installation",
        price: 399.99,
        inStock: true,
      },
      {
        name: "Tire Mounting & Balancing",
        description: "Mounting and balancing of performance tires",
        price: 99.99,
        inStock: true,
      },
      {
        name: "Diagnostic Scan",
        description: "OBD-II diagnostic scan with troubleshooting report",
        price: 59.99,
        inStock: true,
      },
    ],
  });

  console.log("Car shop services seeded!");
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
