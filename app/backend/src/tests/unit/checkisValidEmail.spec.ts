import {checkisValidEmail} from '../../helpers/checkIsValid'
describe("checkisValidEmail",()=>{
    it("should return false when the email is empty",()=>{
        expect(checkisValidEmail('')).toBeFalsy()
    })
    it("should return false when the email doesn't contain @",()=>{
        expect(checkisValidEmail('lorem.com')).toBeFalsy()
    })
    it("should return false when the email doesn't have '.com'",()=>{
        expect(checkisValidEmail('lorem@')).toBeFalsy()
    })
    it("should return false when the email is not a string",()=>{
        expect(checkisValidEmail(false)).toBeFalsy()
        expect(checkisValidEmail(true)).toBeFalsy()
        expect(checkisValidEmail(NaN)).toBeFalsy()
        expect(checkisValidEmail({})).toBeFalsy()
        expect(checkisValidEmail([])).toBeFalsy()
        expect(checkisValidEmail(1234)).toBeFalsy()
        expect(checkisValidEmail(null)).toBeFalsy()
        expect(checkisValidEmail(undefined)).toBeFalsy()
    })
    it("should return false when only '@' is sent as the email",()=>{
        expect(checkisValidEmail("@")).toBeFalsy()
    })
    it("should validate an array with valid emails",()=>{
        const validEmails = [
            "user@example.com",
            "john.doe@mail.co",
            "alice_smith123@domain.org",
            "first.last@sub.domain.com",
            "user+tag@example.io"
        ];
        validEmails.map((val)=>{
            expect( checkisValidEmail(val)).toBeTruthy()
        })
    })
    it("should validate an array of invalid emails",()=>{
        const invalidEmails = [
            "userexample.com",      
            "john.doe@mail",        
            "@domain.com",           
            "user@.com",             
            "user@domain..com",     
            "user@@domain.com",      
            "user domain.com"       
        ];
        invalidEmails.map((val)=>{
            expect( checkisValidEmail(val)).toBeFalsy()
        })
    })
})