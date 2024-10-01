import * as z from "zod";


export const SignupValidation = z.object({
    name: z.string().min(2, { message: "Too short name" }),
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().min(2, { message: "Too short" }),
    password: z.string().min(8, { message: "Must be at least 8 characters" }),
});


export const SigninValidation = z.object({
    email: z.string().min(2, { message: "Too short" }),
    password: z.string().min(8, { message: "Must be at least 8 characters" })
});