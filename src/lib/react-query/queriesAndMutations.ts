import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { createNewUserAccount, signInAccount, signOutAccount, createPost, getRecentPosts, likePost, savePost, getCurrentUser, deleteSavedPost, getPostsById, editPost, deleteEditedPost } from "../../lib/appwrite/api";
import { IeditPost, IlikePost, InewPost, InewUser, IsavePost, IsignInAccount } from "@/types";
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
        queryFn: getRecentPosts
    })
};


export const useLikePost = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (postId: IlikePost) => likePost(postId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_RECENT_POSTS] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_CURRENT_USER] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POSTS] });
        }
    })
};


export const useSavePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (postId: IsavePost) => savePost(postId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_RECENT_POSTS] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_CURRENT_USER] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POSTS] });
        }
    })
};


export const useDeleteSavedPost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (savedPostId: string) => deleteSavedPost(savedPostId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_RECENT_POSTS] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_CURRENT_USER] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POSTS] });
        }
    })
};


//Function to get the current user
export const useGetCurrentUser = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
        queryFn: getCurrentUser
    })
};


// Function to get the post by id
export const useGetPostById = (postId: string) => {
    return useQuery({
        queryFn: () => getPostsById(postId),
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
        enabled: !!postId
    })
};


export const useEditPost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (post: IeditPost) => editPost(post),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id] });
        }
    })
};


export const useDeletePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ postId, imageId }: { postId: string, imageId: string }) => deleteEditedPost(postId, imageId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_RECENT_POSTS] });
        }
    })
};