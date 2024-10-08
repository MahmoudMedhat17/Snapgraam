import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { createNewUserAccount, signInAccount, signOutAccount, createPost, getRecentPost } from "../../lib/appwrite/api";
import { InewPost, InewUser, IsignInAccount } from "@/types";
import { QUERY_KEYS } from "./Querykeys";


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
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_RECENT_POSTS] })
        }
    })
};


export const useGetRecentPosts = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        queryFn: getRecentPost
    })
};