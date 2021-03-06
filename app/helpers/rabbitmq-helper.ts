import {
    config as RabbitMQConfig,
    RabbitMQConfigType,
} from "@CONFIGS/backend/rabbitmq";
import {
    Channel,
    connect,
    Connection,
    ConsumeMessage,
    Options,
    Replies,
} from "amqplib";

export type TopicType =
    | "direct"
    | "topic"
    | "headers"
    | "fanout"
    | "match"
    | string;

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
            heartbeat: 60,
            hostname: this.config.host,
            password: this.config.auth.password,
            port: this.config.port,
            username: this.config.auth.username,
            vhost: this.config.auth.vhost,
        } as Options.Connect;

        /* Try to connect */
        this.connection = await connect(options);

        /* Try to create a channel */
        this.channel = await this.connection.createChannel();
    }

    /**
     * Close connection
     */
    public async close() {
        await this.connection?.close();
    }

    /**
     * Produce a message
     * @param queue {string} Queue name
     * @param message {srting} Message to send
     * @returns {boolean | undefined}
     */
    public produce(queue: string, message: string): boolean | undefined {
        this.channel?.assertQueue(queue);

        return this.channel?.sendToQueue(queue, Buffer.from(message));
    }

    /**
     * Consume a message
     * @param queue {string} Queue name
     * @returns {Replies.Consume | undefined}
     */
    public async consume(
        queue: string,
        onMessage: (msg: ConsumeMessage | null, channel: Channel) => void,
        options?: Options.Consume,
    ): Promise<Replies.Consume | undefined> {
        await this.channel?.assertQueue(queue);

        return await this.channel?.consume(
            queue,
            (msg: ConsumeMessage | null) =>
                onMessage(msg, this.channel as Channel),
            options,
        );
    }

    /**
     * Publish a message
     * @param exchange {string} Exchange name
     * @param topicType {TopicType} TopicType
     * @param routeKey {string} Route key
     * @param content {string} Content
     * @returns {Promise<boolean | undefined>}
     */
    public async publish(
        exchange: string,
        routeKey: string,
        content: string,
        options?: Options.Consume,
    ): Promise<boolean | undefined> {
        return await this.channel?.publish(
            exchange,
            routeKey,
            Buffer.from(content, "utf-8"),
            options,
        );
    }
}
