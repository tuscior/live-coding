  export interface TradeBinanceDTO {
    a: number, // trade ID
    p: string, // price
    q: string, // quantity
    f: number, // first trade id
    l: number, // last trade id
    T: number, // timestamp,
    m: boolean, // was the buyer maker ?
    M: boolean // was the trade the best price match ?
  }


