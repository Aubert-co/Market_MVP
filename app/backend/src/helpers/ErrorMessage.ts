import { Prisma } from "@prisma/client";

type PrismaError = {
    message:string,
    code:string
}
type ErrorType = {
    message:string,
    status:number,
    context?:Record<string,any>,
    service:string,
    action?:string
    prismaError?:PrismaError
}
export class ErrorMessage extends Error {
    public status: number; 
    public service:string
    public context?:Record<string,any>
    public action?:string
    public prismaError?:PrismaError
    constructor({message,service,status,action,context,prismaError}:ErrorType) {
        super(message); 
        this.name = 'ErrorMessage'; 
        this.status = status;       
        this.service = service
        this.action = action
        this.context = context
        this.prismaError = prismaError
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ErrorMessage);
        }
    }
}

export const getPrismaError  = (err:unknown):PrismaError | undefined =>{
    if(err instanceof Prisma.PrismaClientKnownRequestError){
        return {
            message:err.message,
            code:err.code
        }
    }
    return undefined
}