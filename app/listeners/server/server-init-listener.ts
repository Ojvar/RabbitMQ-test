import { GlobalHelper } from "@APP/helpers/global-helper";
import { RabbitMQHelper } from "@APP/helpers/rabbitmq-helper";
import { GlobalData } from "@CORE/helpers/global-data-helper";
import { IEventListener } from "@Lib/interfaces/globa/event-interfaces";

/**
 * ServerInit listener
 */
export default class ServerInitListener implements IEventListener {
    /**
     * Get name
     */
    name(): string {
        return "server-init";
    }

    /**
     * Apply events
     * @param payload {UserCheckListStatusType}
     * @returns {any}
     */
    async handle(payload?: any): Promise<any> {
        GlobalHelper.rabbitMQHelper = new RabbitMQHelper();
        await GlobalHelper.rabbitMQHelper.connect();
        await GlobalHelper.rabbitMQHelper.send("qeng.auth.user.register", "Hello from Ojvar");

        console.log("Server initailized successfully");
    }
}
