var axios = require('axios');
var convert = require("xml-js");

async function getRates() {

  return new Promise((resolve, reject) => {

    axios.get('https://www.tcmb.gov.tr/kurlar/today.xml')
      .then(response => {

        const responseJson = convert.xml2json(response.data, { compact: true, spaces: 2, ignoreDeclaration: true, ignoreInstruction: true });

        var parsedJson = JSON.parse(responseJson);
        resolve(parsedJson.Tarih_Date.Currency);

      }).catch(error => {
        console.log(error);
        reject(new Error("Rates couldn't be received."));
      });
  });
}

exports.getRates = getRates;
