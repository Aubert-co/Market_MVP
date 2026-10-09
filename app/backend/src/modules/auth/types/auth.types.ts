export type User = {
    id:number,
    name:string,
    password:string,
    email:string
}
export type UserInfo = Omit<User,'password'>
export type LoginUserResult = {
    userId:number,
    accessToken:string,
    refreshToken:string
}