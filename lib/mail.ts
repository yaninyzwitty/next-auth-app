// sendVerificationEmail

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL!;

export async function sendVerificationEmail(email: string, token: string) {
    try {
        const confirmationLink = `${domain}/auth/new-verification?token=${token}`;

        // send actual email to user

        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Confirm your email',
            html: `<p>Click <a href="${confirmationLink}">here</a> to confirm your email</p>`
        });


        
    } catch (error) {
        console.log('Error sending verification email', error);
        throw new Error('Error sending verification email')
        
    }
}


export async function sendTwoFactorTokenByEmail(email: string, token: string) {
    try {
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "2FA Code",
            html: `<p>Your 2FA code is: ${token}</p>`
        })
        
    } catch (error) {
        console.log("Error sending verification token", error)
        throw new Error("Error sending verification token")
    }
}