import { isAValidString } from "../../helpers";


describe("function isAValidString",()=>{
    test("When the name is smaller than 4 or equal 4 should return false",()=>{
        const name = "A".repeat(4)
        expect(isAValidString(name)).toBeFalsy()
        
    })
    test("should return falsy when the maxLenght is 200 and send 200 caracteres",()=>{
        const maxLength = 200
        const value = 'a'.repeat(maxLength)
        expect(isAValidString(value ,maxLength )).toBeFalsy()
    })
    test("When the name is a empty string should return false",()=>{
        expect(isAValidString("")).toBeFalsy()
    })
    test("When the name is null should return false",()=>{
        expect(isAValidString("")).toBeFalsy()
    })
    test("When the name is greater than 15 should return false",()=>{
        const name = "a".repeat(16)
        expect( isAValidString(name)).toBeFalsy()
    })
     test("When the name is equal than 15 should return false",()=>{
        const name = "a".repeat(15)
        expect( isAValidString(name)).toBeFalsy()
    })
    test("When the name is a type diferent from string should return false",()=>{
        expect( isAValidString(false)).toBeFalsy()
        expect( isAValidString(true)).toBeFalsy()
        expect( isAValidString(undefined)).toBeFalsy()
        expect(isAValidString(1234)).toBeFalsy()
        expect(isAValidString([])).toBeFalsy()
        expect(isAValidString({})).toBeFalsy()
    })
})