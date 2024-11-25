import { AppConfig } from "../utils/config";
import fetch from 'node-fetch';
import { BinanceValidationError } from "../utils/error";
import { TradeBinanceDTO } from "../interfaces/TradeBinanceResponse";
import { IAnalysis, ITrade } from "../interfaces/TradeApp";

export class TradeService {
    constructor(private config: AppConfig){

    }
    private mapToTradeReadable = (trades: TradeBinanceDTO[]): ITrade[] => {
        return trades.map(trade => ({
            id: trade.a,
            price: trade.p,
            quantity: trade.q,
            timestamp: trade.T
        }))
    }

    private analyzeData = (trades: ITrade[]) => {
        const sortedByTimestamp = trades.sort((tradeA, tradeB) => tradeA.timestamp > tradeB.timestamp ? 1 : -1);
        const firstTrade = sortedByTimestamp[0];
        const lastTrade = sortedByTimestamp[sortedByTimestamp.length - 1];
        const diff = +(+lastTrade.price - +firstTrade.price).toFixed(4);
        return {
            firstTrade,
            lastTrade,
            analysis: {
                difference: diff,
                meaning: `Last trade was ${diff} more expensive than a first trade`
            }
        }
    }

    async getTradesFromBinance(symbol: string, from: number, to: number): Promise<TradeBinanceDTO[]> {
        const url = `${this.config.BINANCE_URL}?symbol=${symbol}&startTime=${from}&endTime=${to}`
        const data = await fetch(url);
        if(data.status === 400){
            throw new BinanceValidationError()
        }
        const trades: TradeBinanceDTO[] = await data.json();
        return trades
    }
    // Fetch historical market data for a specific cryptocurrency symbol and time range using the API. 
    async getTrades(symbol: string, from: number, to: number): Promise<IAnalysis>{
        const binanceTrades = await this.getTradesFromBinance(symbol, from, to)
        const withAnalysis = this.analyzeData(this.mapToTradeReadable(binanceTrades));
        return withAnalysis;
    }
}