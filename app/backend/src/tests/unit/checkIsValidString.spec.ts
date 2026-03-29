import { checkisAValidString } from "../../helpers/checkIsValid";


describe("function checkisAValidString",()=>{
    test("When the name is smaller than 4 or equal 4 should return false",()=>{
        const name = "A".repeat(4)
        expect(checkisAValidString(name)).toBeFalsy()
        
    })
    test("should return falsy when the maxLenght is 200 and send 200 caracteres",()=>{
        const maxLength = 200
        const value = 'a'.repeat(maxLength)
        expect(checkisAValidString(value ,maxLength )).toBeFalsy()
    })
    test("When the name is a empty string should return false",()=>{
        expect(checkisAValidString("")).toBeFalsy()
    })
    test("When the name is null should return false",()=>{
        expect(checkisAValidString("")).toBeFalsy()
    })
    test("When the name is greater than 15 should return false",()=>{
        const name = "a".repeat(16)
        expect( checkisAValidString(name)).toBeFalsy()
    })
     test("When the name is equal than 15 should return false",()=>{
        const name = "a".repeat(15)
        expect( checkisAValidString(name)).toBeFalsy()
    })
    test("When the name is a type diferent from string should return false",()=>{
        expect( checkisAValidString(false)).toBeFalsy()
        expect( checkisAValidString(true)).toBeFalsy()
        expect( checkisAValidString(undefined)).toBeFalsy()
        expect(checkisAValidString(1234)).toBeFalsy()
        expect(checkisAValidString([])).toBeFalsy()
        expect(checkisAValidString({})).toBeFalsy()
    })
})