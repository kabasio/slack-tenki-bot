const request = require('request');

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
};

const yahooOpt = {
  url: 'https://map.yahooapis.jp/weather/V1/place',
  qs: {
    appid: 'dj00aiZpPTJnZUlqcjdJZjFsMiZzPWNvbnN1bWVyc2VjcmV0Jng9Njg-',
    coordinates: '139.767052,35.681167',
    output: 'json',
  },
};

const handleSlackRes = (error, response, body) => {
  // 4.Slackからレスポンスもらったあとの処理
  console.log(error);
  console.log('statusCode', response && response.statusCode);
  console.log(body);
};

const handleYahooRes = (error, response, body) => {
  // 2.Yahooからレスポンスをもらったあとの処理
  console.log(error);
  console.log('statusCode', response && response.statusCode);
  const rainfall = JSON.parse(body).Feature[0].Property.WeatherList.Weather[0].Rainfall;
  const slackOpt = {
    url: 'https://slack.com/api/chat.postMessage',
    method: 'POST',
    headers,
    json: true,
    form: {
      token: process.env.TOKEN,
      channel: process.env.CHANNEL_ID,
      text: `降水強度は${rainfall}%です。`,
    },
  };
  // 3.Yahooからのレスポンスで受け取った情報をSlackのAPIサーバーにPOSTメソッドでリクエスト
  request(slackOpt, handleSlackRes);
};

// 1. YahooのAPIサーバーにGETメソッドでリクエストを送る
request(yahooOpt, handleYahooRes);
