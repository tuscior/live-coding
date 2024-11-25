import { Router, Request, Response, NextFunction } from 'express'
import { TradeService } from '../services/TradeService';

const getTrades = (tradeService: TradeService) => async (req: Request, res: Response, next: NextFunction) => {
    const symbol = req.params.symbol;
    if(!symbol?.trim){
        res.status(404).json({ message: "You provided wrong symbol for this endpoint" })
    }
    try {
        const trades = await tradeService.getTrades(symbol);

    } catch(err) {
        
    }
    
}

export const createTradeController = (service: TradeService): Router => {
    const router = Router().get('/trades/:symbol', getTrades(service))
    return router;
}