const fs = require('fs');
const SimpleROC = require(__dirname + '/SimpleROC');
/*
for (let i = 1; i <= 5; i++) {
    let datas = fs.readFileSync(__dirname + `/files/Unit${i}ROCData.txt`, 'utf8');
    datas = datas.split('\n');

    let predicts = [];
    let labels = [];
    datas.map((data, index) => {
        predicts.push(parseFloat(data.split(',')[0]));
        labels.push(parseInt(data.split(',')[1]));
    });

    let temp = SimpleROC.simpleROC(predicts, labels, 100);

    fs.writeFileSync(__dirname + `/GraphData/Unit${i}GraphData.txt`, ``, 'utf8');
    for (let j = 0; j < temp[0].length; j++) {
        fs.appendFileSync(__dirname + `/GraphData/Unit${i}GraphData.txt`, `${temp[0][j]},${temp[1][j]}\n`, 'utf8');
    }
}
*/

for (let i = 1; i <= 5; i++) {
    let datas = fs.readFileSync(__dirname + `/files/Unit${i}ROCData.txt`, 'utf8');
    datas = datas.split('\n');

    let predicts = [];
    let labels = [];
    datas.map((data, index) => {
        predicts.push(parseFloat(data.split(',')[0]));
        labels.push(parseInt(data.split(',')[1]));
    });

    let temp = SimpleROC.simpleROC(predicts, labels, 100);

    fs.writeFileSync(__dirname + `/GraphData/Unit${i}GraphDataX.txt`, ``, 'utf8');
    fs.writeFileSync(__dirname + `/GraphData/Unit${i}GraphDatay.txt`, ``, 'utf8');
    for (let j = 0; j < temp[0].length; j++) {
        fs.appendFileSync(__dirname + `/GraphData/Unit${i}GraphDataX.txt`, `${temp[0][j]},`, 'utf8');
        fs.appendFileSync(__dirname + `/GraphData/Unit${i}GraphDataY.txt`, `${temp[1][j]},`, 'utf8');
    }
}
