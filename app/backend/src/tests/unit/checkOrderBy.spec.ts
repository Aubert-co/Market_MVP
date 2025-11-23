import {checkOrderBy} from '../../helpers'


describe("checkOrderBy", () => {
    const values = [
        { check: "DESC", toBe: true },
        { check: "asc", toBe: true },
        { check: "invalid", toBe: false },
        { check: "", toBe: false },
        { check: "ABC", toBe: false }
    ];

    it("should validate orderBy correctly", () => {
        values.forEach(val => {
            expect(checkOrderBy(val.check)).toBe(val.toBe);
        });
    });
});
