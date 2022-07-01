var exchangeratecollector = require('./exchangeratecollector');
var rateresponseformatter = require('./rateresponseformatter');
var messageproducer = require("./rateskafkaproducer")

async function collectAndPublish() {
    var currencies = await exchangeratecollector.getRates();
    var availableRates = await rateresponseformatter.extract(currencies);
    console.log(availableRates);

    await messageproducer.produce(availableRates).catch((err) => {
        console.error("error in producer: ", err)
    })
}

exports.collectAndPublish = collectAndPublish;

collectAndPublish();