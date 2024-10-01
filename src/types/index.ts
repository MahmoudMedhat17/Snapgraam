export interface InewUser {
    userName?: string;
    name: string;
    email: string;
    password: string;
};


export interface IsaveUserToDB {
    accoundId: string;
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