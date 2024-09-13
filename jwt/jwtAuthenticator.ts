import { NextFunction, request, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { CustomRequest } from "../server";
import dotenv from "dotenv"

dotenv.config();


export const authenticateJWT = (req: CustomRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY || "3ecretkey", (err, super_admin: any) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.super_admin = super_admin;
            next();
        });
    }
    else {
        res.sendStatus(401);
    }

}