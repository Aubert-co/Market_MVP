import { ErrorMessage } from "../../helpers/ErrorMessage";



describe("ErrorMessage",()=>{
    it("test",()=>{
        const message = "loremIptsu"
        const status = 400
        try {
            throw new ErrorMessage(message , status)
        } catch (error:any) {
            expect(error instanceof ErrorMessage).toBeTruthy()
            expect(error.message).toEqual(message)
            expect(error.status).toEqual(status)
            expect(error.name).toBe("ErrorMessage")
        }
    })
})