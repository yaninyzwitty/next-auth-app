import { UserRole } from '@prisma/client';
import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string(),
  code: z.optional(z.string())
 
});
export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
 
});
export const PasswordSchema = z.object({
password: z.string().min(6, {
  message: "Minimum 6 characters required",
})
 
});

export const SettingsSchema = z.object({
  name: z.optional(z.string()),
  isTwoFactorEnabled: z.optional(z.boolean()),
  role: z.enum([UserRole.ADMIN, UserRole.USER]),
  email: z.optional(z.string().email()),
  password: z.optional(z.string().min(6)),
  newPassword: z.optional(z.string().min(6)),
}).refine((data) => {
  if(data.password && !data.newPassword) {
    return false;

  }

  if(data.newPassword && !data.password) {
    return false;

  };
  return true;


}, {
  message: "New Password is required",
  path: ["newPassword"]
})



export const RegisterSchema = z.object({
    email: z.string().email({
      message: "Email is required",
    }),
    password: z.string().min(6, {
      message: "Minimum 6 characters required",
    }),
    name: z.string().min(1, {
      message: "Name is required",
    }),
  });
