import { createTradeController } from "./controllers/TradeController"
import express, { Router } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import { AppConfig, createAppConfig } from "./utils/config";
import { TradeService } from "./services/TradeService";

export const createExpressApplication = (config: AppConfig, controller: Router) => {

    const app = express();
    app.use(helmet())
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: false }))

    app.use(bodyParser.json())
    app.use(controller)
    app.listen(config.PORT, () => {
        console.log(`App is litnening on port: ${config.PORT}`)
    })
}

export const createApp = async () => {
    const config = createAppConfig();
    const services = new TradeService(config)
    const controller = createTradeController(services);
    const app = createExpressApplication(config, controller)

}