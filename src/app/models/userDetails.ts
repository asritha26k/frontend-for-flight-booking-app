import { UserRole } from "../enums/user-role.enum";
export interface userDetails{
    username:string;
    email:string;
    password:string;
    role:UserRole[];
}