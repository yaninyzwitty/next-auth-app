"use server"

import { getUserByEmail } from "@/data/user";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/schemas"
import { z } from "zod"
import { generateVerificationToken } from "@/data/verification";
import { sendVerificationEmail } from "@/lib/mail";

export const registerValues = async (values: z.infer<typeof RegisterSchema>) => {

    try {
        const validatedFields = RegisterSchema.safeParse(values);
        if(!validatedFields.success){
            return {
                error: "Invalid fields!"
            }
        }

        const { email, password, name } = validatedFields.data;
        // find if there is an existing email

        const existingUser = await getUserByEmail(email);
        const hashedPassword = await bcrypt.hash(password, 10);

        if(existingUser){
            return {
                error: "Email already exists!"
            }
        };

        await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword
            }
        });

        // send an email to verify the user


        const verificationToken = await generateVerificationToken(email);

        // then send an actual email to the user

        await sendVerificationEmail( verificationToken?.email as string, verificationToken?.token as string);

    return { success: "Confirmation email sent!"}
              
    } catch (error) {
        console.log('REGISTER_ACTION ERROR  ', error)
        return {
            error: "Something went wrong!"
        }
        
    }
}