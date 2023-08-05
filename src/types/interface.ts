import { UserStatus } from "./enum.js";

export interface User {
    uid: number;
    mail: string;
    password: string;
    status: UserStatus
}


