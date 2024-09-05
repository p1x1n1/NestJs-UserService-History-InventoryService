const amqp = require('amqplib');

const RABBITMQ_URL = process.env.RABBITMQ_URL;

let channel = null;

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

const publishMessage = async (queue, message) => {
    if (!channel) {
        await connect();
    }
    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
    console.log(`Message sent to queue ${queue}: ${message}`);
};

const consumeMessage = async (queue, callback) => {
    if (!channel) {
        await connect();
    }
    await channel.assertQueue(queue, { durable: true });
    channel.consume(queue, (msg) => {
        if (msg !== null) {
            console.log(`Message received from queue ${queue}: ${msg.content.toString()}`);
            callback(msg.content.toString());
            channel.ack(msg);
        }
    });
};

module.exports = {
    connect,
    publishMessage,
    consumeMessage,
};
