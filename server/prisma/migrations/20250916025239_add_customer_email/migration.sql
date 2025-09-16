/*
  Warnings:

  - Made the column `customerEmail` on table `WorkOrder` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."WorkOrder" ALTER COLUMN "customerEmail" SET NOT NULL;
