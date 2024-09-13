import { prisma } from "../server";
interface ICredentials {
    email: string;
    password: string;
}
export const admins = async(credential:ICredentials) => {
    const isAdmin = await  prisma.admin.findUnique({
        where: {
            email: credential.email,
            password:credential.password
        }
    })

    return isAdmin;
}