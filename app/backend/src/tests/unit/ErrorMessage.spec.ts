import { ErrorMessage } from "../../helpers/ErrorMessage";


 const message = "loremIptsu"
const status = 400
const service = "TESTING"
const action = "ACTION"
const prismaError = {
    code:'P4NVUE',
    message:'prisma testing'
}
describe("ErrorMessage",()=>{
    it("When the ErrorMessage has all parameters",()=>{
       
        try {
            throw new ErrorMessage({
                message,status,service,action,prismaError
            })
        } catch (error:any) {
            expect(error instanceof ErrorMessage).toBeTruthy()
            expect(error.message).toEqual(message)
            expect(error.status).toEqual(status)
            expect(error.name).toBe("ErrorMessage")
            expect(error.action).toBe(action)
            expect(error.service).toBe(service)
            expect(error.prismaError.message).toBe(prismaError.message)
            expect(error.prismaError.code).toBe(prismaError.code)
        }
    })
    it("When sending the Prisma error, it is undefined",()=>{
    
        try {
            throw new ErrorMessage({
                message,status,service
            })
        } catch (error:any) {
            expect(error instanceof ErrorMessage).toBeTruthy()
            expect(error.message).toEqual(message)
            expect(error.status).toEqual(status)
            expect(error.name).toBe("ErrorMessage")
            expect(error.action).toBeUndefined()
            expect(error.service).toBe(service)
            expect(error.prismaError).toBeUndefined()
        }
    })
})