import { Router, Request, Response, NextFunction } from 'express'
import { TradeService } from '../services/TradeService';
import { BinanceValidationError, CLIENT_VALIDATION_ERROR, SOMETHING_WENT_WRONG } from '../utils/error';
import { isError } from '../utils/unkown';

const validate = (timeRangeFrom: string, timeRangeTo: string): [number, number] => {
    try {
        const from = parseInt(timeRangeFrom);
        const to = parseInt(timeRangeTo);
        return [from, to]
    } catch(err){
        throw new Error('Query parameters from and to has to be a parsable number in miliseconds')
    }
}

const getTrades = (tradeService: TradeService) => async (req: Request, res: Response, next: NextFunction) => {
    const symbol = req.params.symbol;
    const timeRangeFrom = req.query.from as string;
    const timeRangeTo = req.query.to as string;
    try {
        validate(timeRangeFrom, timeRangeTo);
    } catch(err: unknown){
        if(isError(err)){
            res.status(400).json({ message: err.message })
        }
        res.status(500).json({ message: SOMETHING_WENT_WRONG })
    }
    if(!symbol?.trim){
        res.status(400).json({ message: CLIENT_VALIDATION_ERROR })
    }
    try {
        const trades = await tradeService.getTrades(symbol, +timeRangeFrom, +timeRangeTo);
        res.status(200).json(trades);
        return;
    } catch(err) {
        if(err instanceof BinanceValidationError) {
            res.status(404).json({ message: CLIENT_VALIDATION_ERROR });
            return;
        }
        res.status(500).json({ message: SOMETHING_WENT_WRONG });
        return;
    }
    
}

export const createTradeController = (service: TradeService): Router => {
    const router = Router().get('/trades/:symbol', getTrades(service))
    return router;
}