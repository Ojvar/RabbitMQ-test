import {
    config as RabbitMQConfig,
    RabbitMQConfigType,
} from "@CONFIGS/backend/rabbitmq";
import { Channel, connect, Connection, Options } from "amqplib";

/**
 * Rabbit-mq helper
 */
export class RabbitMQHelper {
    private config: RabbitMQConfigType = RabbitMQConfig();
    private connection?: Connection;
    private channel?: Channel;

    /**
     * Connect to rabbit-mq broker
     */
    public async connect() {
        const options: Options.Connect = {
            hostname: this.config.host,
            password: this.config.auth.password,
            port: this.config.port,
            username: this.config.auth.username,
            heartbeat: 60,
            vhost: this.config.auth.vhost,
        } as Options.Connect;

        console.log(options);

        /* Try to connect */
        const connection: Connection = await connect(options);

        /* Store connection */
        this.connection = connection;

        /* Try to create a channel */
        const channel: Channel = await this.connection.createChannel();

        /* Store channel */
        this.channel = channel;
    }

    /**
     * Close connection
     */
    public async close() {
        await this.connection?.close();
    }

    /* Send */
    public send(queue: string, message: string): boolean | undefined {
        this.channel?.assertQueue(queue, {
            // durable: false,
        });

        return this.channel?.sendToQueue(queue, Buffer.from(message));

        /* Log */
        console.log(" [x] Sent %s", message);
    }
}
