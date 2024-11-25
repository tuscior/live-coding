import { Router, Request, Response, NextFunction } from 'express'
import { TradeService } from '../services/TradeService';
import { BinanceValidationError } from '../utils/error';

const getTrades = (tradeService: TradeService) => async (req: Request, res: Response, next: NextFunction) => {
    const symbol = req.params.symbol;
    if(!symbol?.trim){
        res.status(400).json({ message: "You provided wrong symbol for this endpoint" })
    }
    try {
        const trades = await tradeService.getTrades(symbol);
        res.status(200).json(trades);
        return;
    } catch(err) {
        if(err instanceof BinanceValidationError) {
            res.status(404).json({ message: "You provided wrong symbol for this endpoint" });
            return;
        }
        res.status(500).json({ message: "Something went wrong. Please try again" });
        return;
    }
    
}

export const createTradeController = (service: TradeService): Router => {
    const router = Router().get('/trades/:symbol', getTrades(service))
    return router;
}