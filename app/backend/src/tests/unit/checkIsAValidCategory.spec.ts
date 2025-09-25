import { checkIsAValidCategory } from "../../helpers"

describe("check is a valid category",()=>{
    it("test",()=>{
        expect(checkIsAValidCategory('Eletronicos')).toBeTruthy()
        expect(checkIsAValidCategory('eletronicos')).toBeTruthy()
        expect(checkIsAValidCategory('3eletronicos')).toBeFalsy()
        expect(checkIsAValidCategory('eletrônicos')).toBeTruthy()
    })
})