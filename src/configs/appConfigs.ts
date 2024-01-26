import * as dotenv from "dotenv";

dotenv.config();

const APPCONFIGS = {
	PORT: 8001,
	BASE_PATH: "/api",
    TEST_SECRET: process.env.TEST_SECRET,
    TEST_CONFIGMAP: process.env.TEST_CONFIGMAP
};

export default APPCONFIGS;
