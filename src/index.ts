import express from "express";
import { APPCONFIGS } from "./configs";

const cors = require("cors");

class Server {
	public app: express.Application;

	constructor() {
		this.app = express();

		this.app.use(
			cors({
				origin: "*",
				methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"]
			})
		);
		this.config();
	}

	public config(): void {
		this.app.set("port", APPCONFIGS.PORT);
		this.app.use(express.json({ limit: "10mb" }));
		this.app.use(express.static("public"));

        this.app.get('/', (_req, res) => {
            const secretTest = APPCONFIGS.TEST_SECRET;
            const configmapTest = APPCONFIGS.TEST_SECRET;

            if(secretTest && configmapTest) {
                return res.status(200).send({
                    secret_test: APPCONFIGS.TEST_SECRET,
                    configmap_test: APPCONFIGS.TEST_CONFIGMAP,
                    message: "Secrets and configmaps have been loaded successfully"
                });
            }

            return res.status(200).send({
                secret_test: APPCONFIGS.TEST_SECRET,
                configmap_test: APPCONFIGS.TEST_CONFIGMAP,
                error: "Unable to load Secrets and configmaps properly."
            });
        })
	}

	public start(): void {
		this.app.listen(this.app.get("port"), () => {
			console.log("Server listening in port", APPCONFIGS.PORT);
		});
	}
}

const server = new Server();
server.start();
