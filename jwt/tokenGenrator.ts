import jwt, { SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

type super_admin =
    {
        id: number,
        fullname: string,
        email: string,
        password: string
    }

const option: SignOptions = {
    expiresIn: '5h',
    algorithm:"HS256"
}    
export const genrateToken = (sAdmin:super_admin) => {

    const token = jwt.sign({ _id: sAdmin.id, email: sAdmin.email }, process.env.SECRET_KEY || "3ecretkey", option);

    return token;
}

