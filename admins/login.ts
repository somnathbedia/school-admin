import express, { Request, Response } from "express";
import { admins } from "./query";
import { genrateToken } from "../jwt/tokenGenrator";
import { authenticateJWT } from "../jwt/jwtAuthenticator";
import { prisma } from "../server";
const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingAdmin = await admins({ email, password });
    if (existingAdmin) {
        const token = genrateToken(existingAdmin);
        res.json({ msg: "Admin logged in!", token })
    }

});

router.post("/admission/create", authenticateJWT, async (req: Request, res: Response) => {
    const { fullname, father_name, mother_name, contact_no, address, standard, } = req.body;

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

})

export default router;