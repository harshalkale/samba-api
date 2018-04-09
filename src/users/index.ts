import * as Hapi from "hapi";
import Routes from "./routes";
import { IDatabase } from "../database";
import { IServerConfigurations } from "../_config";

export function init(server: Hapi.Server, configs: IServerConfigurations, database: IDatabase) {
    Routes(server, configs, database);
}