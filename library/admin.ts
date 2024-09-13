import { Router, Request, Response } from "express";
import { authenticateJWT } from "../jwt/jwtAuthenticator";
import { createBook } from "./query";
import { prisma } from "../server";
const router = Router();


export type Book =  {
    name: string,
    title: string,
    author: string,
    copies:number
}

router.post('/create/book', authenticateJWT, async(req: Request, res: Response) => {
    const { name, title, author, copies } = req.body;
    const tuple:Book = {
        name,
        title,
        author,
        copies
    }

    const record = await createBook(tuple);

    res.status(201).json({ msg: "Record added successfully", record });
});

router.get('/books', authenticateJWT, async (req: Request, res: Response) => {

    try
    {
        const books = await prisma.book.findMany();
        if (books)
        {
            res.json({ msg: "Available books are", books })
            return;
        }
    }
    catch (error)
    {
        console.log(error);
    }
   

});

router.put("/update/:id", authenticateJWT, async (req: Request, res: Response) => {
    const { copies } = req.body;
    const { id } = req.params;

    const upDatedBook = await prisma.book.update({
        data: {
          copies:copies  
        },
        where: {
            id: id
        }
    })

    if (upDatedBook)
    {
        res.status(201).json({ msg: "Record Updated", upDatedBook });
        return;
    }
});

export default router;