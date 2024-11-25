export interface IAnalysis {
    firstTrade: ITrade,
    lastTrade: ITrade,
    analysis: {
        difference: number
    }
}

export interface ITrade {
    id: number,
    price: string,
    quantity: string,
    timestamp: number
  }