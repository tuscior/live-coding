import { AppConfig } from "../utils/config";
import fetch from 'node-fetch';
import { BinanceValidationError } from "../utils/error";
import { TradeBinanceDTO } from "../interfaces/TradeBinanceResponse";

export class TradeService {
    constructor(private config: AppConfig){

    }
    // Fetch historical market data for a specific cryptocurrency symbol and time range using the API. 
    async getTrades(symbol: string, from: number, to: number): Promise<TradeBinanceDTO[]>{
        const url = `${this.config.BINANCE_URL}?symbol=${symbol}&startTime=${from}&endTime=${to}`
        const data = await fetch(url);
        if(data.status === 400){
            throw new BinanceValidationError()
        }
        const trades: TradeBinanceDTO[] = await data.json();
        return trades;
    }
}