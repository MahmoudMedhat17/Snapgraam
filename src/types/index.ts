export interface InewUser {
    userName?: string;
    name: string;
    email: string;
    password: string;
};


export interface IsaveUserToDB {
    accountId: string;
    name: string;
    email: string;
    imageUrl: URL;
    userName?: string;
};


export interface IsignInAccount {
    email: string;
    password: string;
};


export interface Iuser {
    id: string,
    userName: string,
    name: string,
    email: string,
    imageUrl: string,
    bio: string
};


export interface IcontextType {
    user: Iuser,
    isLoading: boolean,
    isAuthenticated: boolean,
    setUser: React.Dispatch<React.SetStateAction<Iuser>>,
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
    checkUserAuth: () => Promise<boolean>,
};


export interface InewPost {
    userId: string;
    caption: string;
    file: File[];
    location: string;
    tags: string;
};


export interface IeditPost {
    postId: string;
    imageId: string;
    imageUrl: URL;
    caption: string;
    file: File[];
    location: string;
    tags: string;
};


export interface IlikePost {
    postId: string;
    likesArray: string[];
};

export interface IsavePost {
    postId: string;
    userId: string;
};


export interface IupdateUser {
    userId: string | undefined;
    name: string;
    bio: string;
    imageId: string;
    imageUrl: URL | string;
    file: File[];
};