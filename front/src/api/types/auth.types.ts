import type { user } from "./user.types";

export interface authContextType {
    user:user | null|undefined,
    isLoading:boolean,
    isAuthenticated:boolean,
    sessionError:string | null,

login:(email:string,password:string)=>Promise<void>,
logout:()=>Promise<void>,
checkSession:()=>Promise<void>,
}