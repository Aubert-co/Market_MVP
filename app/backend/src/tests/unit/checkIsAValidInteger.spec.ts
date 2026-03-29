import { checkIsAValidInteger } from "../../helpers/checkIsValid"

describe("function checkIsAValidInteger",()=>{
    
    const cases: Array<[any, boolean]> = [
        ['', false],
        [1, true],
        ['1', true],
        [0, false],
        [1.5, false],
        ['01',true]
    ]

    it.each(cases)('input: %p → expected: %p', (input, expected) => {
        expect(checkIsAValidInteger(input)).toBe(expected)
    })
    
})