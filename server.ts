import * as bodyParser from 'body-parser';
import {GameController} from './src/server/controllers/GameServer.controller';
import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';

class DemoServer extends Server {

    private readonly SERVER_START_MSG = 'Demo server started on port: ';
    private readonly _DEV_MSG = 'Express Server is running in development mode. ' +
        'No front-end content is being served.';

    constructor() {
        super(true);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "http://localhost:3333"); // update to match the domain you will make the request from
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        super.addControllers(new GameController());

        // Point to front-end code
        if (process.env.NODE_ENV !== 'production') {
            console.info('Starting server in development mode');
            const msg = this._DEV_MSG + process.env.EXPRESS_PORT;
            this.app.get('*', (req, res) => res.send(msg));
        }
    }

    public start(port: number): void {
        this.app.listen(port, () => {
            Logger.Imp(this.SERVER_START_MSG + port);
        });
    }
}

export default DemoServer;