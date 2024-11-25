import { describe, test, expect } from "@jest/globals"
import { TradeService } from "../services/TradeService"

describe('Sum function', () =>{
    const trades = new TradeService({ PORT: 0, BINANCE_URL: '' });
    
    test('Returns correct value', () =>{
        expect(sum(2, 3)).toEqual(5)
    })
})