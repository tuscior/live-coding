const str = (str: string | undefined, fallback: string) => {
    if(str?.trim()){
        return str?.trim();
    }
    return fallback;
}

const num = (num: string | undefined, fallback: number) => {
    if(num){
        try {
            return parseInt(num)
        } catch(err) {
            throw new Error('Port has to be a number');
        }   
    }
    return fallback;
}

export const createAppConfig = () => {
    return {
        PORT: num(process.env.PORT, 3000),
        BINANCE_URL: str(process.env.BINANCE_URL, '')
    }
}


export type AppConfig = ReturnType<typeof createAppConfig>