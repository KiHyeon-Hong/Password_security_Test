const fs = require('fs');

let datas = fs.readFileSync(__dirname + '/../performanceData/unit5Report1.txt', 'utf8');
datas = datas.split('\n');

let performanceData = datas.filter((data, index) => {
    return index % 2 == 1;
});

let loss = [];
let performance = [];
let time = [];

performanceData.map((data, index) => {
    let temp = data.split(',');

    loss.push(parseFloat(temp[0]));
    performance.push(parseInt(temp[1]) / (parseInt(temp[1]) + parseInt(temp[2])));
    time.push(parseInt(temp[3]));
});

let lossSum = 0;
let performanceSum = 0;
let timeSum = 0;

performanceData.map((data, index) => {
    lossSum += loss[index];
    performanceSum += performance[index];
    timeSum += time[index];
});

console.log('loss: ' + lossSum / loss.length);
console.log('time: ' + timeSum / time.length);
console.log('performance: ' + performanceSum / performance.length);
