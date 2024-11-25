export const SOMETHING_WENT_WRONG = 'Something went wrong. Please Try again';

export const CLIENT_VALIDATION_ERROR = 'You provided wrong symbol for this endpoint'

export class BinanceValidationError extends Error {
    constructor(){
        super('Binance Validation Error')
    }
}

