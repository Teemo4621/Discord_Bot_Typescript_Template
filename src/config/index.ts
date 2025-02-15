import * as dotenv from "dotenv";
import * as path from "path";

const envFile = `.env.${process.env.NODE_ENV || "development"}`;

dotenv.config({ path: path.resolve(envFile) });

interface ConfigApp {
    PORT: number;
    API_VERSION: string;
    DISCORD_TOKEN: string;
    //add more config
}

const ConfigApp = {
    PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    API_VERSION: process.env.API_VERSION || "1",
    DISCORD_TOKEN: process.env.DISCORD_TOKEN || "",
}

export default ConfigApp