import { prisma } from "@/lib/prisma";
import crypto from 'crypto'

export const getTwoFactorTokenByEmail = async (email: string) => {
    try {
        const twoFactorToken = await prisma.twoFactorToken.findFirst({
            where: {
                email
            }
        });

        return twoFactorToken;
        
    } catch (error) {
        console.log("Error getting two factor token", error);
        return null;
        
    }
}
export const getTwoFactorTokenByToken = async (token: string) => {
    try {
        const twoFactorToken = await prisma.twoFactorToken.findUnique({
            where: {
                token
            }
        });

        return twoFactorToken;
        
    } catch (error) {
        console.log("Error getting two factor token", error);
        return null;
        
    }
}


// #refactored
export const generateTwoFactorToken = async (email: string) => {
    try {
        // Generate a 6-digit random token
        const token = crypto.randomInt(100_000, 1_000_000).toString();

        // Set token expiration time to 5 minutes from now
        const expires = new Date(Date.now() + 5 * 60 * 1000);

        // Check if a two-factor token already exists for the email
        const existingToken = await getTwoFactorTokenByEmail(email);

        // If an existing token is found, delete it
        if (existingToken) {
            await prisma.twoFactorToken.delete({
                where: { id: existingToken.id }
            });
        }

        // Create a new two-factor token
        const twoFactorToken = await prisma.twoFactorToken.create({
            data: {
                email,
                token,
                expires
            }
        });

        console.log('twoFactorToken', twoFactorToken)

        return twoFactorToken;
        
    } catch (error) {
        console.error('Error generating two-factor token:', error);
        return null;  // Consider throwing an error for better error handling or use a logger
    }
};
