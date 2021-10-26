const fs = require('fs');

var tf = require('@tensorflow/tfjs');
require('tfjs-node-save');

var oriDatas = fs.readFileSync(__dirname + '/../files/leakPasswords.txt', 'utf8');
oriDatas = oriDatas.split('\n');

var datas = [];
for (let i = 0; i < oriDatas.length; i++) {
    datas[i] = oriDatas[i].split('\r')[0];
}

var leakString = [];
var leakDataFeature1 = [];
var leakDataFeature2 = [];
var leakDataFeature3 = [];
var leakDataValue = [];

for (let i = 0; i < datas.length; i++) {
    leakString[i] = datas[i].split(',')[0];
    leakDataFeature1[i] = datas[i].split(',')[1];
    leakDataFeature2[i] = datas[i].split(',')[2];
    leakDataFeature3[i] = datas[i].split(',')[3];
    leakDataValue[i] = 0;
}

oriDatas = fs.readFileSync(__dirname + '/../files/notLeakPasswords.txt', 'utf8');
oriDatas = oriDatas.split('\n');

datas = [];
for (let i = 0; i < oriDatas.length; i++) {
    datas[i] = oriDatas[i].split('\r')[0];
}

var notLeakString = [];
var notLeakDataFeature1 = [];
var notLeakDataFeature2 = [];
var notLeakDataFeature3 = [];
var notLeakDataValue = [];

for (let i = 0; i < datas.length; i++) {
    notLeakString[i] = datas[i].split(',')[0];
    notLeakDataFeature1[i] = datas[i].split(',')[1];
    notLeakDataFeature2[i] = datas[i].split(',')[2];
    notLeakDataFeature3[i] = datas[i].split(',')[3];
    notLeakDataValue[i] = 1;
}

var string = [];
var feature1 = [];
var feature2 = [];
var feature3 = [];
var value = [];

for (let i = 0; i < 64865; i++) {
    string[2 * i] = leakString[i];
    feature1[2 * i] = leakDataFeature1[i];
    feature2[2 * i] = leakDataFeature2[i];
    feature3[2 * i] = leakDataFeature3[i];
    value[2 * i] = leakDataValue[i];

    string[2 * i + 1] = notLeakString[i];
    feature1[2 * i + 1] = notLeakDataFeature1[i];
    feature2[2 * i + 1] = notLeakDataFeature2[i];
    feature3[2 * i + 1] = notLeakDataFeature3[i];
    value[2 * i + 1] = notLeakDataValue[i];
}

var trainData = [];
var trainLabel = [];

var validationData = [];
var validationLabel = [];

var testData = [];
var testLabel = [];

for (let i = 0; i < 93415; i++) {
    trainData[i] = [parseInt(feature1[i]), parseInt(feature2[i]), parseInt(feature3[i])];
    trainLabel[i] = parseInt(value[i]);
}

for (let i = 93415; i < 120103; i++) {
    validationData[i - 93415] = [parseInt(feature1[i]), parseInt(feature2[i]), parseInt(feature3[i])];
    validationLabel[i - 93415] = parseInt(value[i]);
}

for (let i = 120103; i < feature1.length; i++) {
    testData[i - 120103] = [parseInt(feature1[i]), parseInt(feature2[i]), parseInt(feature3[i])];
    testLabel[i - 120103] = parseInt(value[i]);
}

for (let i = 64865; i < leakString.length - 1; i++) {
    testData.push([parseInt(leakDataFeature1[i]), parseInt(leakDataFeature2[i]), parseInt(leakDataFeature3[i])]);
    testLabel.push(leakDataValue[i]);
}

async function passwordValidation() {
    for (let i = 1; i <= 32; i = i * 2) {
        for (let j = 1; j <= 32; j = j * 2) {
            for (let k = 1; k <= 32; k = k * 2) {
                for (let l = 1; l <= 32; l = l * 2) {
                    fs.writeFileSync(__dirname + `/../ROCData/5_[4,${i},${j},${k},${l}].txt`, '', 'utf8');

                    for (let d = 0; d < testData.length; d++) {
                        const loadedModel = await tf.loadLayersModel('file://' + __dirname + `/../models/5_[4,${i},${j},${k},${l}]/model.json`);
                        var predictPoint = loadedModel.predict(tf.tensor([testData[d]]));
                        predictPoint = Array.from(predictPoint.dataSync())[0];
                        fs.appendFileSync(__dirname + `/../ROCData/5_[4,${i},${j},${k},${l}].txt`, `${predictPoint},${testLabel[d]}`, 'utf8');

                        if (d != testData.length - 1) fs.appendFileSync(__dirname + `/../ROCData/5_[4,${i},${j},${k},${l}].txt`, `\n`, 'utf8');
                    }
                }
            }
        }
    }
}

passwordValidation();
