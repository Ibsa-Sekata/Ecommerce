import { it, expect, describe } from "vitest";
import { formatMoney } from "./money.js";


describe('format suit: formatMoney', () => {
    it('format 1999  as $19.99', () => {
        expect(formatMoney(1999)).toBe('$19.99')
    });

    it('format 0  as $0.00 display 2 decimals', () => {
        expect(formatMoney(0)).toBe('$0.00')
    })


    it('format 199.6  as $19.90', () => {
        expect(formatMoney(199.6)).toBe('$2.00')
    })
})
