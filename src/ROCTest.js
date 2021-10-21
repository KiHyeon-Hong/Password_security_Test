const fs = require('fs');

var tf = require('@tensorflow/tfjs');
require('tfjs-node-save');

var oriDatas = fs.readFileSync('../files/leakPasswords.txt', 'utf8');
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

oriDatas = fs.readFileSync('../files/notLeakPasswords.txt', 'utf8');
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

console.log(string.length);

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
console.log(trainData.length);

for (let i = 93415; i < 120103; i++) {
    validationData[i - 93415] = [parseInt(feature1[i]), parseInt(feature2[i]), parseInt(feature3[i])];
    validationLabel[i - 93415] = parseInt(value[i]);
}

console.log(validationData.length);

for (let i = 120103; i < feature1.length; i++) {
    testData[i - 120103] = [parseInt(feature1[i]), parseInt(feature2[i]), parseInt(feature3[i])];
    testLabel[i - 120103] = parseInt(value[i]);
}

for (let i = 64865; i < leakString.length - 1; i++) {
    testData.push([leakDataFeature1[i], leakDataFeature2[i], leakDataFeature3[i]]);
    testLabel.push(leakDataValue[i]);
    // fs.appendFileSync('./test.txt', `${leakString[i]}, ${leakDataFeature1[i]}, ${leakDataFeature2[i]}, ${leakDataFeature3[i]}, ${leakDataValue[i]}\n`, 'utf8');
}

console.log(testData.length);

for (let i = 0; i < testData.length; i++) {
    fs.appendFileSync('./test.txt', `${testData[i]}, ${testLabel[i]}\n`, 'utf8');
}
