const request = require('request');

const headers = {
    'Content-Type':'application/x-www-form-urlencoded'
}

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

request(options, function(error, response, body){
    console.log(error);
    console.log('statusCode',response && response.statusCode);
    console.log(body);
}); 