import { createExpressApplication } from "../app";
import { createTradeController } from "../controllers/TradeController";
import { TradeService } from "../services/TradeService";
import { createAppConfig } from "../utils/config";
import request from 'supertest'
import { CLIENT_VALIDATION_ERROR } from "../utils/error";


describe('GET /trades', function () {
    const config = createAppConfig();
    const services = new TradeService(config);
    const controller = createTradeController(services);
    const { app, server } = createExpressApplication(config, controller);

    afterAll(async () => {
        await server.closeAllConnections();
    })

    it('responds with json and 200 status code', function () {
        return request(app)
            .get('/trades/BTCUSDT?from=1732527724369&to=1732527724369')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body.analysis).toBeDefined();
            })
    });
    it('responds with json and 400 status code because no `to` param was provided', function () {
        return request(app)
            .get('/trades/BTCUSDT?from=1732527724369')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
              .expect(400)
            .then(response => {
                expect(response.body.message).toBeDefined();
            })
    });
    it('responds with json and 400 status code because wrong symbol was provided', function () {
        return request(app)
            .get('/trades/1?from=1732527724369&to=1732527724369')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body.message).toEqual(CLIENT_VALIDATION_ERROR);
            })
    });
    it('responds with json and 400 status code because no from parameter was provided', function () {
        return request(app)
            .get('/trades/BTCUSDT&to=1732527724369')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body.message).toEqual(CLIENT_VALIDATION_ERROR);
            })
    });
    it('responds with json and 400 status code because from parameter was provided in wrong format', function () {
        return request(app)
            .get('/trades/BTCUSDT?from=fdsfsdfs&to=1732527724369')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body.message).toEqual(CLIENT_VALIDATION_ERROR);
            })
    });
});