import { IlikePost, InewPost, InewUser, IsavePost, IsaveUserToDB, IsignInAccount, IeditPost } from "@/types"
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
            await deleteFile(uploadedFile.$id);
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
export const getRecentPosts = async () => {
    try {
        const recentPosts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            [
                Query.orderDesc("$createdAt"),
                Query.limit(20)
            ]
        );
        if (!recentPosts || !recentPosts.documents.length) throw Error("No recent posts found!");
        return recentPosts.documents;
    } catch (error) {
        console.log(error);
    }
};


//Function to get update the like of the post
export const likePost = async ({ postId, likesArray }: IlikePost) => {
    try {
        const likedPost = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            postId,
            {
                likes: likesArray
            }
        );
        if (!likePost) throw Error;

        return likedPost;
    } catch (error) {
        console.log(error);
    }
};


// Function to save the post
export const savePost = async ({ postId, userId }: IsavePost) => {
    try {
        const savedPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.saveCollectionId,
            ID.unique(),
            {
                post: postId,
                user: userId
            }
        );

        if (!savePost) throw Error;

        return savedPost;
    } catch (error) {
        console.log(error);
    }
};


// Function to delete the savedPost
export const deleteSavedPost = async (savedPostId: string) => {
    try {
        const deletedPost = await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.saveCollectionId,
            savedPostId
        );
        if (!deletedPost) throw Error;
        return { status: "OK" };
    } catch (error) {
        console.log(error);
    }
};


// Function to Edit the post
export const editPost = async (post: IeditPost) => {

    const hasFileUpdated = post.file.length > 0;

    try {

        let image = {
            imageId: post.imageId,
            imageUrl: post.imageUrl
        };

        if (hasFileUpdated) {
            // Upload file to appwrite storage
            const uploadedFile = await uploadedFileFunc(post.file[0]);
            if (!uploadedFile) throw Error;

            // Get file url
            const fileUrl = getFilePreview(uploadedFile.$id);
            // If the file is corrupted then delete the file
            if (!fileUrl) {
                await deleteFile(uploadedFile.$id);
                throw Error;
            };


            image = { ...image, imageId: uploadedFile.$id, imageUrl: fileUrl };

            // Convert tags into array
            const tags = post.tags.replace(/ /g, "").split(",") || [];

            // Edit post
            const editedPost = await databases.updateDocument(
                appwriteConfig.databaseId,
                appwriteConfig.postCollectionId,
                post.postId,
                {
                    caption: post.caption,
                    location: post.location,
                    imageUrl: image.imageUrl,
                    imageId: image.imageId,
                    tags: tags
                }
            )
            if (!editedPost) {
                await deleteFile(uploadedFile.$id);
                throw Error;
            };
            return editedPost;
        }
    } catch (error) {
        console.log(error);
    }
};


//Function to delete the edit of the post
export const deleteEditedPost = async (postId: string, imageId: string) => {

    if (!postId || !imageId) throw Error;

    try {
        const status = await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            postId
        );

        if (!status) throw Error;

        return { status: "ok" };
    } catch (error) {
        console.log(error);
    }
};


// Function to get the post by ID
export const getPostsById = async (postId: string) => {
    try {
        const post = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            postId
        );
        if (!post) throw Error;
        return post;
    } catch (error) {
        console.log(error);
    }
};


//Function to get infinite posts
export const getAllInfinitePosts = async ({ pageParam }: { pageParam: number }) => {

    const queries: string[] = [Query.orderDesc("$updateAt"), Query.limit(10)];

    if (pageParam) {
        queries.push(Query.cursorAfter(pageParam.toString()));
    }

    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            queries
        );

        if (!posts) throw Error;

        return posts;
    } catch (error) {
        console.log(error);
    }
};


//Function for searching for posts
export const searchPosts = async (searchPost: string) => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            [Query.search("caption", searchPost)]
        );

        if (!posts) throw Error;

        return posts;
    } catch (error) {
        console.log(error);
    }
};