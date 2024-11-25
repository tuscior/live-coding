import { createTradeController } from "./controllers/TradeController";
import express, { Router } from "express";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import { AppConfig, createAppConfig } from "./utils/config";
import { TradeService } from "./services/TradeService";
import rateLimit from "express-rate-limit";
import { PATH_DOES_NOT_EXISTS } from "./utils/error";

export const createExpressApplication = (
    config: AppConfig,
    controller: Router
) => {
    const app = express();
    app.use(helmet());
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));

    const limiter = rateLimit({
        windowMs: 60 * 1000, // 1 minute
        limit: 1200 // Limit each IP to 1200 requests per `window` (here, per 1 minutes).
    });

    // Apply the rate limiting middleware to all requests.
    app.use(limiter);

    app.use(bodyParser.json());
    app.use(controller);
    app.use((_, res) => {
        res.status(404).json({ message: PATH_DOES_NOT_EXISTS });
    })
    const server = app.listen(config.PORT, () => {
        console.log(`App is litnening on port: ${config.PORT}`);
    });
    return { app, server };
};

export const createApp = async () => {
    const config = createAppConfig();
    const services = new TradeService(config);
    const controller = createTradeController(services);
    const app = createExpressApplication(config, controller);
    return app;
};
