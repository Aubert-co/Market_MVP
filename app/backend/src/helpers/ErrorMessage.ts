export class ErrorMessage extends Error {
    public status: number; 
   
    constructor(message: string, status: number) {
        super(message); 
        this.name = 'ErrorMessage'; 
        this.status = status;       

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ErrorMessage);
        }
    }
}