var exchangeratecollector = require('./exchangeratecollector');
var rateresponseformatter = require('./rateresponseformatter');
var messageproducer = require("./rateskafkaproducer")

async function firstFunction() {
    var currencies = await exchangeratecollector.getRates();
    var availableRates = await rateresponseformatter.extract(currencies);
    console.log(availableRates);

    await messageproducer.produce(availableRates).catch((err) => {
        console.error("error in producer: ", err)
    })
}

firstFunction();