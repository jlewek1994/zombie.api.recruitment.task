import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as cors from "cors";
import * as express from "express";
import * as logger from "morgan";

class App {
    public express: express.Application;

    constructor(router: express.Router) {
        this.express = express();
        this.config();
        this.express.use(router);
    }

    private config(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.set("json spaces", 4);
        this.express.use(logger("common"));
        this.express.use(cors());
        this.express.use(compression());
    }
}

export default App;
