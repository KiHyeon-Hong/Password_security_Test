const fs = require('fs');
const SimpleROC = require(__dirname + '/SimpleROC');

let datas = fs.readFileSync(__dirname + '/files/ROCTestData.txt', 'utf8');
datas = datas.split('\n');

let predicts = [];
let labels = [];
datas.map((data, index) => {
    predicts.push(parseFloat(data.split(',')[0]));
    labels.push(parseInt(data.split(',')[1]));
});

SimpleROC.simpleROC(predicts, labels, 10);
