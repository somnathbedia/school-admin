/*
  Warnings:

  - You are about to drop the column `class` on the `student_register` table. All the data in the column will be lost.
  - Added the required column `standard` to the `student_register` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "student_register" DROP COLUMN "class",
ADD COLUMN     "standard" TEXT NOT NULL;
