import { AppConfig } from "../utils/config";
import fetch from 'node-fetch';

export class TradeService {
    constructor(private config: AppConfig){

    }
    // Fetch historical market data for a specific cryptocurrency symbol and time range using the API. 
    async getTrades(symbol: string){
        const data = await fetch(`${this.config.BINANCE_URL}?symbol=${symbol}`);
        const trades = await data.json();
        return trades;
    }
}