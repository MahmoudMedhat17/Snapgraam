import { InewPost, InewUser, IsaveUserToDB, IsignInAccount } from "@/types"
import { account, databases, avatars, storage } from "./config";
import { ID, ImageGravity, Query } from "appwrite";
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
            accountId: newAccount.$id,
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
    };
};


//Function to sign in the user account
export const signInAccount = async (user: IsignInAccount) => {
    try {
        const session = await account.createEmailPasswordSession(user.email, user.password);
        return session;
    } catch (error) {
        return error;
    };
};


//Function to remove the current session
export const signOutAccount = async () => {
    try {
        const session = await account.deleteSession("current");
        return session;
    } catch (error) {
        console.log(error);
        return error;
    };
};


// Function to get the account that is currently logged in
export const getAccount = async () => {
    try {
        const currentAccount = await account.get();
        return currentAccount;
    } catch (error) {
        console.log(error);
    };
};


// Function to get the user
export const getCurrentUser = async () => {
    try {
        const currentAccount = await getAccount();

        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        );

        if (!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
        return null;
    };
};



// POSTS

//Function to create a post and save it to appwrite
export const createPost = async (post: InewPost) => {
    try {
        // Upload file to appwrite storage
        const uploadedFile = await uploadedFileFunc(post.file[0]);
        if (!uploadedFile) throw Error;

        // Get file url
        const fileUrl = getFilePreview(uploadedFile.$id);
        // If the file is corrupted then delete the file
        if (!fileUrl) {
            deleteFile(uploadedFile.$id);
            throw Error;
        };

        // Convert tags into array
        const tags = post.tags.replace(/ /g, "").split(",") || [];

        // Create post
        const newPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            ID.unique(),
            {
                creator: post.userId,
                caption: post.caption,
                location: post.location,
                imageUrl: fileUrl,
                imageId: uploadedFile.$id,
                tags: tags
            }
        )
        if (!newPost) {
            await deleteFile(uploadedFile.$id);
            throw Error;
        };
        return newPost;
    } catch (error) {
        console.log(error);
    }
};


//Function to upload the file to appwrite storage
export const uploadedFileFunc = async (file: File) => {
    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            file
        )
        return uploadedFile;
    } catch (error) {
        console.log(error);
    }
};


//Function to get the file url
export const getFilePreview = (fileId: string) => {
    try {
        const fileUrl = storage.getFilePreview(
            appwriteConfig.storageId,
            fileId,
            2000, //Width
            2000, //Height
            ImageGravity.Top,
            100 //Quality
        );
        if (!fileUrl) throw Error;
        return fileUrl;
    } catch (error) {
        console.log(error);
    }
};


//Function to delete the file
export const deleteFile = async (fileId: string) => {
    try {
        await storage.deleteFile(
            appwriteConfig.storageId,
            fileId
        );
        return { status: "OK" };
    } catch (error) {
        console.log(error);
    }
};


//Function to get all the posts
export const getRecentPost = async () => {
    try {
        const recentPosts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            [
                Query.orderDesc("$createdAt"), Query.limit(20)
            ]
        );
        if (!recentPosts) throw Error;
        return recentPosts;
    } catch (error) {
        console.log(error);
    }
};