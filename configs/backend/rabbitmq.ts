/**
 * Config
 * @returns <Function>
 */
export const config = () =>
    ({
        host: process.env.RABBITMQ_HOST || "localhost",
        port: +(process.env.RABBITMQ_PORT || "5672"),
        auth: {
            password: process.env.RABBITMQ_AUHT_PASSWORD || "guest",
            username: process.env.RABBITMQ_AUTH_USERNAME || "guest",
            vhost: process.env.RABBITMQ_AUHT_VHOST || "/",
        },
    } as RabbitMQConfigType);

/**
 * RabbitMQConfigType
 */
export type RabbitMQConfigType = {
    host: string;
    port: number;
    auth: {
        vhost: string;
        password: string;
        username: string;
    };
};
