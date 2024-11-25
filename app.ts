import { createTradeController } from "./controllers/TradeController"
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import bodyParser from 'body-parser';
import { AppConfig, createAppConfig } from "./utils/config";

export const createExpressApplication = (config: AppConfig) => {

    const app = express();
    app.use(helmet())
    app.listen(config.PORT, () => {
        console.log(`App is litnening on port: ${config.PORT}`)
    })
}

export const createApp = async () => {
    const config = createAppConfig();
    const controller = createTradeController();

    const app = createExpressApplication(config)
}