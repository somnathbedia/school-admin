/*
  Warnings:

  - You are about to drop the `Request` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Student` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_studentId_fkey";

-- DropTable
DROP TABLE "Request";

-- DropTable
DROP TABLE "Student";

-- CreateTable
CREATE TABLE "student" (
    "id" TEXT NOT NULL,
    "student_name" VARCHAR(100) NOT NULL,
    "father_name" VARCHAR(100) NOT NULL,
    "mother_name" VARCHAR(100) NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "blood_group" CHAR(3) NOT NULL,
    "contact_number" TEXT NOT NULL,
    "email" VARCHAR(25) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,

    CONSTRAINT "student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "request" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "request_type" TEXT NOT NULL,
    "request_book" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "request_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "student_email_key" ON "student"("email");

-- AddForeignKey
ALTER TABLE "request" ADD CONSTRAINT "request_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
