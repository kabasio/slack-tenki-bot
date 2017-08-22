const request = require('request');

const headers = {
    'Content-Type':'application/x-www-form-urlencoded'
}//毎回変わる可能性があるから、外に出して定義する

const options = {
    url: 'https://slack.com/api/chat.postMessage',
    method: 'POST',
    headers: headers,
    json: true,
    form: {
        token:process.env.TOKEN,
        channel:process.env.CHANNEL_ID,
        text:'Hello,nishitani-shokudo.',
    }
}

const handleResponse = function(error, response, body) {
  console.log(error);
  console.log('statusCode',response && response.statusCode);/*なんで「&&(←演算子)」なの？A.responseが帰ってこないこともあるから。response　がtrue相当だったら&&以降もみにいく
  nullのプロパティを参照しようとするとerrorになるから*/
  console.log(body);  
};

request(options,handleResponse);
