import {User} from "./user.ts";

export interface IProfile {
    username: string;
    displayName: string;
    image?: string;
    bio?: string;
    photos?: IPhoto[];
}

export class Profile implements IProfile {
    constructor(user: User) {
        this.username = user.username;
        this.displayName = user.displayName;
        this.image = user.image;
    }

    username: string;
    displayName: string;
    image: string | undefined;
    bio?: string;
    photos?: IPhoto[];
}

export interface IPhoto {
    id: string;
    url: string;
    isMain: boolean;
}