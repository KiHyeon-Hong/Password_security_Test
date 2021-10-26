const fs = require('fs');
const SimpleROC = require(__dirname + '/../SimpleROC');

for (let i = 1; i <= 32; i = i * 2) {
    let datas = fs.readFileSync(__dirname + `/../ROCData/1_[${i}].txt`, 'utf8');
    datas = datas.split('\n');

    let predicts = [];
    let labels = [];
    datas.map((data, index) => {
        predicts.push(parseFloat(data.split(',')[0]));
        labels.push(parseInt(data.split(',')[1]));
    });

    let data = SimpleROC.simpleROC(predicts, labels, 50);

    fs.writeFileSync(__dirname + `/../GraphData/1_[${i}]`, '', 'utf8');
    for (let a = 0; a < data[0].length; a++) {
        fs.appendFileSync(__dirname + `/../GraphData/1_[${i}]`, `${data[0][a]},${data[1][a]}\n`, 'utf8');
    }
}
