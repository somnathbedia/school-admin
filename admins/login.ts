import express, { Request, Response } from "express";
import { admins } from "./query";
import { genrateToken } from "../jwt/tokenGenrator";
import { authenticateJWT } from "../jwt/jwtAuthenticator";
import { prisma } from "../server";
import { z } from "zod"

const AdminCredentials = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string()
})

const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {

    try {
        const { email, password } = AdminCredentials.parse(req.body);
        const existingAdmin = await admins({ email, password });
        if (existingAdmin) {
            const token = genrateToken(existingAdmin);
            res.json({ msg: `Admin logged in as ${existingAdmin.jobType}`, token })
        }
    }
    catch (error) {
        res.status(400).json({
            msg: "Validation error",
            errors: error
        })
    }
});

router.post("/admission/create", authenticateJWT, async (req: Request, res: Response) => {
    const { fullname, father_name, mother_name, contact_no, address, standard, } = req.body;
    try {
        const student = await prisma.student_Register.create({
            data: {
                fullname,
                father_name,
                mother_name,
                contact_no,
                address,
                standard
            }
        })

        if (student) {
            res.status(201).json({ msg: "Student Admitted!", student });
            return;

        }
    }
    catch (error) {
        console.log(error);
    }


})

export default router;