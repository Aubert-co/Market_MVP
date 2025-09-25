import { checkIsAValidNumber } from "../../helpers"

describe("",()=>{
    it("check is a valid number",()=>{
        expect(checkIsAValidNumber('')).toBeFalsy()
        expect(checkIsAValidNumber(1)).toBeTruthy()
        expect(checkIsAValidNumber('1')).toBeTruthy()
        expect(checkIsAValidNumber(0)).toBeFalsy()
        expect(checkIsAValidNumber(1.5)).toBeTruthy()
        expect(checkIsAValidNumber(-1)).toBeFalsy()
        expect(checkIsAValidNumber('124e')).toBeFalsy()
        expect(checkIsAValidNumber('1e1')).toBeFalsy()
        expect(checkIsAValidNumber(false)).toBeFalsy()
        expect(checkIsAValidNumber(true)).toBeFalsy()
        expect(checkIsAValidNumber(undefined)).toBeFalsy()
        expect(checkIsAValidNumber(Number(undefined))).toBeFalsy()
        expect(checkIsAValidNumber( Number('12as') )).toBeFalsy()
        expect(checkIsAValidNumber( Number('null') )).toBeFalsy()
        expect(checkIsAValidNumber( Number('false') )).toBeFalsy()
        expect(checkIsAValidNumber( Number('true') )).toBeFalsy()
        expect(checkIsAValidNumber( Number('') )).toBeFalsy()

    })
})