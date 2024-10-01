import { useMutation } from "@tanstack/react-query";
import { createNewUserAccount, signInAccount } from "../../lib/appwrite/api";
import { InewUser, IsignInAccount } from "@/types";


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