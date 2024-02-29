const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

access_key = process.env.EXCHANGE_API_KEY;

const getExchangeRate = async (from, to) => {
    try {
        console.log("In exchange function");
        //Need to change base currency to &base=USD
        //Its not currently possible with free plan
        const response = await axios.get('http://api.exchangeratesapi.io/v1/latest?access_key='+access_key);
        //console.log("response:",response);
        const euro = 1 / response.data.rates[from];
        const rate = euro * response.data.rates[to];

        if (isNaN(rate)) {
        throw new Error();
        }

        return rate;
    } catch (e) {
        throw new Error(`Unable to get exchange rate for ${from} and ${to}.`);
    }
};

const convertCurrency = async (from, to, amount) => {
    const rate = await getExchangeRate(from, to);
    //const countries = await getCountries(to);
    const convertedAmount = (amount * rate).toFixed(2);
    return `${amount} ${from} is worth ${convertedAmount} ${to}`;
};

convertCurrency('XAF', 'NGN', 20).then((message) => {
    console.log(message);
    }).catch((e) => {
    console.log(e.message);
});