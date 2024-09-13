/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `super_admin` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "super_admin_email_key" ON "super_admin"("email");
