import { describe, test } from "@jest/globals"
import { TradeService } from "../services/TradeService"
import { binanceResponse } from "./mocks/BinanceResponse";

const binanceResponseJestFn = jest.fn(() => binanceResponse())


describe('TradeService', () =>{
    const tradeServiceMock = new TradeService({ PORT: 0, BINANCE_URL: '' });
    tradeServiceMock.getTradesFromBinance = binanceResponseJestFn;

    test('Correctly returns values', async () =>{
        const params = {
            symbol: "BTCUSDT",
            from: 1732527724369,
            to: 1732527724369
        }
        const trades = await tradeServiceMock.getTrades(params.symbol, params.from, params.to);
        expect(binanceResponseJestFn).toHaveBeenCalled()
    })
})