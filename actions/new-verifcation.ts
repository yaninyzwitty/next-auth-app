"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification";
import { prisma } from "@/lib/prisma";

export const newVerification = async (token: string) => {
    try {
        // check existing token
        
        const existingToken = await getVerificationTokenByToken(token);

        if (!existingToken) {
            return { error: "Token does not exist!" };
          }

          const hasExpired = new Date(existingToken.expires) < new Date();


          if(hasExpired){
            return {  error: "Token has expired!" };
          }

          const existingUser = await getUserByEmail(existingToken.email);

          if(!existingUser){
            return {  error: "User does not exist!" };
          }

        //   update the user to make their email verified
        await prisma.user.update({
            where: {
                id: existingUser.id
            },
            data: {
                emailVerified: new Date()
            }
        });

        // delete the verification token

        await prisma.verificationToken.delete({
            where: {
                id: existingToken.id
            }
        });

        return { success: "Email verified!" };    

    } catch (error) {
        console.log(error);
        return {
            error: "Something went wrong!"
        }
        
    }
}