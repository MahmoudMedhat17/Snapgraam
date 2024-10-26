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


export const PostValidation = z.object({
    caption: z.string().min(2, { message: "Minimum 2 characters" }).max(2200, { message: "Maximum 2200 characters" }),
    file: z.custom<File[]>(),
    location: z.string().min(1, { message: "Minimum 1 character" }).max(1000, { message: "Maximum 1000 characters" }),
    tags: z.string()
});


export const ProfileUploadValidation = z.object({
    name: z.string().min(2, { message: "name must be at least 2 characters" }),
    userName: z.string().min(2, { message: "name must be at least 2 characters" }),
    email: z.string().email(),
    bio: z.string(),
    file: z.custom<File[]>()
});