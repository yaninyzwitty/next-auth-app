import { prisma } from "@/lib/prisma";

export const getUserById = async (id: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        });
        return user;
        
    } catch (error) {
        return null;
        
    }
};

export const getUserByEmail = async (email: string) => {
    try {

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        
        return user;
        
    } catch (error) {
        return null;
        
    }

}


export const getAccountByToken = async (token: string) => {
    try {
        const user = await prisma.account.findUnique({
            where: {
                id: token
            }
        });
        return user;
        
    } catch (error) {
        return null;
        
    }
};