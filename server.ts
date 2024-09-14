import express, { Response, Request } from "express";
import dotenv from 'dotenv';
import { PrismaClient } from "@prisma/client";
import { genrateToken } from "./jwt/tokenGenrator";
import { authenticateJWT } from "./jwt/jwtAuthenticator";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000
export const prisma = new PrismaClient()
import cors from "cors";
import library from "./library/admin"
import admin from "./admins/login";

import { z } from "zod";

const AdminI = z.object({
    fullname: z.string().max(25),
    email: z.string().email(),
    password: z.string().max(12),
    jobType:z.enum(['ACCOUNTANT','LIBRARIAN','EXAMCONTROLLER','OTHERS'])
})
export interface CustomRequest extends Request {
    super_admin?: any;
}

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json({ msg: "Server is ok" });
})

app.post("/superadmins/signin", async (req: Request, res: Response) => {
    const { email, password } = req.body;


    try {
        const sAdmin = await prisma.superAdmin.findUnique({
            where: {
                email,
                password
            }
        })

        if (sAdmin) {
            const token = genrateToken(sAdmin);
            res.json({ msg: "Super Admin logged in!", token })
        }
    } catch (error) {
        console.error(error);
    }

})

app.post("/superadmins/createadmins", authenticateJWT, async (req: Request, res: Response) => {

    try
    {
        const { fullname, email, password, jobType } = AdminI.parse(req.body);


    const admin = await prisma.admin.create({
        data: {
            fullname,
            email,
            password,
            jobType
        }
    })

    res.status(201).json({ msg: "Admin created Successfully", admin })
    }
    catch (error)
    {
        res.status(400).json({
            message: 'Validation error',
            errors: error,
          }); 
    }
    
})

app.use("/admins", admin)
app.use("/library", library);

app.listen(PORT, () => {
    console.log(`erver is up and running on port ${PORT}`);
})

