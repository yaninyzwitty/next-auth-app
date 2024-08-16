import { prisma } from "@/lib/prisma";

export const generateVerificationToken = async (email: string ) => {
    try {
        const token = crypto.randomUUID();
        const expires = new Date(new Date().getTime() + 3600 * 1000);  //expire in 1 hour;
        const existingToken = await getVerificationTokenByEmail(email);
        // delete existing token
        if(existingToken) {
            await prisma.verificationToken.delete({
                where: {
                    id: existingToken.id
                }
            });


        };

        // create new token


        const verificationToken = await prisma.verificationToken.create({
            data: {
                email,
                token,
                expires
            }
        });


        return verificationToken;
        
    } catch (error) {
        return null;
        
    }

}

const getVerificationTokenByEmail = async (email: string) => {
    try {
       const verification = await prisma.verificationToken.findFirst({
        where: {
            email
        }
       });

       return verification;
        
    } catch (error) {
        return null;
        
    }
}



export const getVerificationTokenByToken = async (token: string) => {
    try {
        const verificationToken = await prisma.verificationToken.findFirst({
            where: {
                token
            }
        });

        return verificationToken;
        
    } catch (error) {
        console.log('Failed to get verification token', error);
        return null;
        
    }
}