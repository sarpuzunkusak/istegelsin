const { Kafka } = require("kafkajs")

const brokers = ["localhost:9092"]
const topic = "exchange-rates"

const kafka = new Kafka({ brokers: brokers })
const producer = kafka.producer()

async function produce(message) {

    return new Promise((resolve, reject) => {

        try {
            producer.connect().then(() => {
                producer.send({
                    topic,
                    messages: [
                        {
                            value: JSON.stringify(message)
                        },
                    ],
                }).then(() => {
                    producer.disconnect()
                });
            });
            console.log("message sent.");
            resolve(true);
        } catch (err) {
            console.error("could not write message " + err)
            reject(new Error("could not write message " + err));
        }
    });

}

exports.produce = produce;