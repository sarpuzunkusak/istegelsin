const { Kafka } = require("kafkajs")

const brokers = ["localhost:9092"]
const topic = "exchange-rates"

const kafka = new Kafka({ brokers: brokers })
const producer = kafka.producer()

async function produce(message) {

    return new Promise((resolve, reject) => {

        try {
            producer.connect().then(() => {
                console.log("producer connected.");
                producer.send({
                    topic,
                    messages: [
                        {
                            value: JSON.stringify(message)
                        },
                    ],
                }).then(() => {
                    console.log("message sent.");
                    producer.disconnect().then(() => {
                        console.log("producer disconnected.");
                        resolve(true);
                    });
                });
            });
        } catch (err) {
            console.error("could not write message " + err)
            reject(new Error("could not write message " + err));
        }
    });

}

exports.produce = produce;