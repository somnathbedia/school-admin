import { prisma } from "../server";
import { Book } from "./admin";

export const createBook = async (tuple: Book) => {
    const record = await prisma.book.create({
        data: {
            name: tuple.name,
            title: tuple.title,
            author: tuple.author,
            copies:tuple.copies
        }
    })

    return record ? record : [];
}