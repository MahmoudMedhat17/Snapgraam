import { InewUser, IsaveUserToDB, IsignInAccount } from "@/types"
import { account, databases, avatars } from "./config";
import { ID, Query } from "appwrite";
import { appwriteConfig } from "./config";


//Function to create a new user when sign up
export const createNewUserAccount = async (user: InewUser) => {
    try {
        const newAccount = await account.create(
            user.name,
            user.email,
            user.password,
            ID.unique(),
        );

        // Check if there's no account if yes then throw an error
        if (!newAccount) throw Error;


        // Set the avatar if not found as the name passed for ex: "Mahmoud medhat to MM"
        const avatarUrl = avatars.getInitials(user.name);

        const newUser = await saveUserToDB({
            accoundId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            imageUrl: avatarUrl,
            userName: user.name
        });

        return newUser;
    } catch (error) {
        console.log(error);
        return error;
    };
};


// Function to save the user to database by documents in Appwrite
export const saveUserToDB = async (user: IsaveUserToDB) => {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user
        );
        return newUser;
    } catch (error) {
        console.log(error);
        return error;
    };
};


//Function to sign in the user account
export const signInAccount = async (user: IsignInAccount) => {
    try {
        const session = await account.createEmailPasswordSession(user.email, user.password);
        return session;
    } catch (error) {
        console.log(error);
        return error;
    }
};


// Function to get the account that is currently logged in
export const getAccount = async () => {
    try {
        const currentAccount = await account.get();

        return currentAccount;
    } catch (error) {
        console.log(error);
    }
};


// Function to get the user
export const getCurrentUser = async () => {
    try {
        const currentAccount = await getAccount();

        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId", currentAccount?.$id)]
        );

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
        return null;
    }
};
