import { checkIsAValidNumber } from "../../helpers/checkIsValid"

describe("function checkIsAValidNumber",()=>{
    
    const cases: Array<[any, boolean]> = [
        ['', false],
        [1, true],
        ['1', true],
        [0, false],
        [1.5, true],
        [-1, false],
        ['124e', false],
        ['1e1', false],
        [false, false],
        [true, false],
        [undefined, false],
        [Number(undefined), false],
        [Number('12as'), false],
        [Number('null'), false],
        [Number('false'), false],
        [Number('true'), false],
        [Number(''), false],
        [[], false],
        [[1], false],
        [{}, false],
        [{ number: 1 }, false],
        ['[1]', false],
        [['1'], false],
        [' ', false],
        ['\n', false],
        [null, false],
        [Symbol('1'), false],
        [() => 1, false],
        [Number.MAX_SAFE_INTEGER, true],
        ['999999', true],
        ['01', true],
        [Infinity, false],
        [-Infinity, false],
        [NaN, false],
        ['Symbol(1)',false],
        ['NaN',false],
        ['Number(1)',false]
    ]

    it.each(cases)('input: %p → expected: %p', (input, expected) => {
        expect(checkIsAValidNumber(input)).toBe(expected)
    })
    
})