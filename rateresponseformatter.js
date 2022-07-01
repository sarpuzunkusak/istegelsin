
async function extract(currencies) {
    return new Promise((resolve, reject) => {
        let availableParities = [];

        for (let i = 0; i < currencies.length; i++) {

            if(Object.keys(currencies[i].ForexBuying).length !== 0) {
                availableParities.push({ "Name": currencies[i]._attributes.CurrencyCode + "TRY", "value": currencies[i].ForexBuying._text });
                console.log(currencies[i]._attributes.CurrencyCode + "TRY " + currencies[i].ForexBuying._text);
            }

            if (Object.keys(currencies[i].CrossRateUSD).length !== 0) {
                availableParities.push({ "Name": "USD" + currencies[i]._attributes.CurrencyCode, "value": currencies[i].CrossRateUSD._text });
                console.log("USD" + currencies[i]._attributes.CurrencyCode + " " + currencies[i].CrossRateUSD._text)
            } else if (Object.keys(currencies[i].CrossRateOther).length !== 0) {
                availableParities.push({ "Name": currencies[i]._attributes.CurrencyCode + "USD", "value": currencies[i].CrossRateOther._text });
                console.log(currencies[i]._attributes.CurrencyCode + "USD " + currencies[i].CrossRateOther._text)
            }
        }

        resolve(availableParities);

    });

}

exports.extract = extract;