// Message.js
class Message {
    constructor(author, content, channel) {
        this.author = author;
        this.content = content;
        this.channel = channel;
    }
}

// MessageProducer.js
class MessageProducer {
    constructor() {
        this.subscribers = {};
    }

    subscribe(channel, callback) {
        if (!this.subscribers[channel]) {
            this.subscribers[channel] = [];
        }
        this.subscribers[channel].push(callback);
    }

    publish(message) {
        const { channel } = message;
        if (this.subscribers[channel]) {
            this.subscribers[channel].forEach(callback => callback(message));
        }
    }
}

// MessageConsumer.js
class MessageConsumer {
    constructor() {
        this.messages = [];
    }

    handleMessage(message) {
        this.messages.push(message);
        console.log("Received message:", message);
    }
}

// Test
const producer = new MessageProducer();

const consumer1 = new MessageConsumer();
producer.subscribe("channel1", consumer1.handleMessage.bind(consumer1));


const consumer2 = new MessageConsumer();
producer.subscribe("channel2", consumer2.handleMessage.bind(consumer2));

const message1 = new Message("User1", "Hello from channel 1!", "channel1");
const message2 = new Message("User2", "Hi from channel 2!", "channel2");
const message3 = new Message("User3", "Greetings from channel 1!", "channel1");

producer.publish(message1);
producer.publish(message2);
producer.publish(message3);


const ThirdPart = () => {
    return (
        <div>

        </div>
    );
};

export default ThirdPart;
