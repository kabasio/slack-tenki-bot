const weather = require('./getweather');

// 再帰関数(自分を呼び出す関数)
const run = () => {
  const now = new Date();
  if (now.getHours() === 7 && now.getMinutes() === 30) {
    weather();
  }
  setTimeout(run, 10000);
};

run();
