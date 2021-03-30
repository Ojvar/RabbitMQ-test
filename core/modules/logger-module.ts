import { CoreModule } from "./core-module-interface";
import { GlobalData } from "core/helpers/global-data-helper";
import { LoggerHelper } from "core/helpers/logger-helper";

/**
 * Logger module
 */
export default class LoggerModule extends CoreModule {
    /**
     * Ctr
     * @param logger Console
     */
    constructor(logger: Console) {
        super(logger);
    }

    /**
     * Register method
     * @param payload any
     */
    public async register(payload?: any): Promise<any> {
        this.logger.log("Register Module: Logger");

        return this;
    }

    /**
     * Boot method
     * @param payload any
     */
    public async boot(payload?: any): Promise<any> {
        const loggerHelper = new LoggerHelper(this.logger);
        const logger = await loggerHelper.initLogger();

        /* Store in Global-data */
        GlobalData.logger = logger;

        this.logger.log("Boot Module: Logger");
        return this;
    }
}
