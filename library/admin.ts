import { Router, Request, Response } from "express";
import { authenticateJWT } from "../jwt/jwtAuthenticator";
import { createBook } from "./query";
import { prisma } from "../server";
import { object, z } from "zod";
const router = Router();

const ZBook = z.object({
    name: z.string().max(30),
    title: z.string().max(30),
    author: z.string().max(25),
    copies: z.number()
});

export type Book = {
    name: string,
    title: string,
    author: string,
    copies: number
}

router.post('/create/book', authenticateJWT, async (req: Request, res: Response) => {

    try {
        const { name, title, author, copies } = ZBook.parse(req.body);
        const tuple: Book = {
            name,
            title,
            author,
            copies
        }

        const record = await createBook(tuple);

        res.status(201).json({ msg: "Record added successfully", record });
    }
    catch (error) {
        throw new Error("Invalid input");
        res.status(400).json({
            message: 'Validation error',
            errors: error,
        });
    }

});

router.get('/books', authenticateJWT, async (req: Request, res: Response) => {

    try {
        const books = await prisma.book.findMany();
        if (books) {
            res.json({ msg: "Available books are", books })
            return;
        }
    }
    catch (error) {
        console.log(error);
    }


});

router.put("/update/:id", authenticateJWT, async (req: Request, res: Response) => {
    const { copies } = req.body;
    const { id } = req.params;

    const upDatedBook = await prisma.book.update({
        data: {
            copies: copies
        },
        where: {
            id: id
        }
    })

    if (upDatedBook) {
        res.status(201).json({ msg: "Record Updated", upDatedBook });
        return;
    }
});

export default router;