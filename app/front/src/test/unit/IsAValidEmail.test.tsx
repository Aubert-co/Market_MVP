import { isValidEmail } from "@/utils/checkIsValid"


describe("isValidEmail",()=>{
    it("should return false when the email is empty",()=>{
        expect(isValidEmail('')).toBeFalsy()
    })
    it("should return false when the email doesn't contain @",()=>{
        expect(isValidEmail('lorem.com')).toBeFalsy()
    })
    it("should return false when the email doesn't have '.com'",()=>{
        expect(isValidEmail('lorem@')).toBeFalsy()
    })
    it("should return false when the email is not a string",()=>{
        expect(isValidEmail(false)).toBeFalsy()
        expect(isValidEmail(true)).toBeFalsy()
        expect(isValidEmail(NaN)).toBeFalsy()
        expect(isValidEmail({})).toBeFalsy()
        expect(isValidEmail([])).toBeFalsy()
        expect(isValidEmail(1234)).toBeFalsy()
        expect(isValidEmail(null)).toBeFalsy()
        expect(isValidEmail(undefined)).toBeFalsy()
    })
    it("should return false when only '@' is sent as the email",()=>{
        expect(isValidEmail("@")).toBeFalsy()
    })
})