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

// console.log(SimpleROC.simpleROC(predicts, labels, 10));

// console.log(SimpleROC.simpleROC([22, 21, 20, 19, 18, 17, 16, 15, 14, 13], [1, 1, 1, 1, 1, 0, 0, 0, 0, 0], 10));
