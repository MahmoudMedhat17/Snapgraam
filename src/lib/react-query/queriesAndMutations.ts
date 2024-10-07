import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewUserAccount, signInAccount, signOutAccount, createPost } from "../../lib/appwrite/api";
import { InewUser, IsignInAccount, InewPost } from "@/types";


export const useCreateNewUserAccount = () => {
    return useMutation({
        mutationFn: (user: InewUser) => createNewUserAccount(user),
    });
};


export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user: IsignInAccount) => signInAccount(user),
    })
};

export const useSignOutAccount = () => {
    return useMutation({
        mutationFn: signOutAccount
    })
};


export const useCreatePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (post: InewPost) => createPost(post),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["GetRecentPosts"]
            })
        }
    })
};