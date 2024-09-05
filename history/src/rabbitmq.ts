import amqp from 'amqplib';

const RABBITMQ_URL = process.env.RABBITMQ_URL;

let channel: amqp.Channel | null = null;

const connect = async () => {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        channel = await connection.createChannel();
        console.log('Connected to RabbitMQ');
    } catch (error) {
        console.error('Failed to connect to RabbitMQ', error);
        process.exit(1);
    }
};

export const publishMessage = async (queue: string, message: string) => {
    if (!channel) {
        await connect();
    }
    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
    console.log(`Message sent to queue ${queue}: ${message}`);
};

export const consumeMessage = async (queue: string, callback: (message: string) => void) => {
    if (!channel) {
        await connect();
    }
    await channel.assertQueue(queue, { durable: true });
    channel.consume(queue, (msg) => {
        if (msg !== null) {
            console.log(`Message received from queue ${queue}: ${msg.content.toString()}`);
            callback(msg.content.toString());
            channel?.ack(msg);
        }
    });
};
