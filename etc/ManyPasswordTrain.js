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

var trainDataTensor = tf.tensor(trainData);
var trainLabelTensor = tf.tensor(trainLabel);
var validationDataTensor = tf.tensor(validationData);
var validationLabelTensor = tf.tensor(validationLabel);

function modelCreateDepth1(unit1, activation) {
    var X = tf.input({ shape: [3] });
    var h1 = tf.layers.dense({ units: unit1, activation: activation }).apply(X);
    var Y = tf.layers.dense({ units: 1, activation: 'sigmoid' }).apply(h1);

    var model = tf.model({ inputs: X, outputs: Y });

    var compileParam = { optimizer: tf.train.adam(), loss: tf.losses.meanSquaredError };
    model.compile(compileParam);

    return model;
}

function modelCreateDepth2(unit1, unit2, activation) {
    var X = tf.input({ shape: [3] });
    var h1 = tf.layers.dense({ units: unit1, activation: activation }).apply(X);
    var h2 = tf.layers.dense({ units: unit2, activation: activation }).apply(h1);
    var Y = tf.layers.dense({ units: 1, activation: 'sigmoid' }).apply(h2);

    var model = tf.model({ inputs: X, outputs: Y });

    var compileParam = { optimizer: tf.train.adam(), loss: tf.losses.meanSquaredError };
    model.compile(compileParam);

    return model;
}

function modelCreateDepth3(unit1, unit2, unit3, activation) {
    var X = tf.input({ shape: [3] });
    var h1 = tf.layers.dense({ units: unit1, activation: activation }).apply(X);
    var h2 = tf.layers.dense({ units: unit2, activation: activation }).apply(h1);
    var h3 = tf.layers.dense({ units: unit3, activation: activation }).apply(h2);
    var Y = tf.layers.dense({ units: 1, activation: 'sigmoid' }).apply(h3);

    var model = tf.model({ inputs: X, outputs: Y });

    var compileParam = { optimizer: tf.train.adam(), loss: tf.losses.meanSquaredError };
    model.compile(compileParam);

    return model;
}

function modelCreateDepth4(unit1, unit2, unit3, unit4, activation) {
    var X = tf.input({ shape: [3] });
    var h1 = tf.layers.dense({ units: unit1, activation: activation }).apply(X);
    var h2 = tf.layers.dense({ units: unit2, activation: activation }).apply(h1);
    var h3 = tf.layers.dense({ units: unit3, activation: activation }).apply(h2);
    var h4 = tf.layers.dense({ units: unit4, activation: activation }).apply(h3);
    var Y = tf.layers.dense({ units: 1, activation: 'sigmoid' }).apply(h4);

    var model = tf.model({ inputs: X, outputs: Y });

    var compileParam = { optimizer: tf.train.adam(), loss: tf.losses.meanSquaredError };
    model.compile(compileParam);

    return model;
}

var nodes = [4, 3, 2, 1];

var units = [
    [1, 1, 1, 1],
    [1, 1, 1, 3],
    [1, 1, 1, 5],
    [1, 1, 3, 1],
    [1, 1, 3, 3],
    [1, 1, 3, 5],
    [1, 1, 5, 1],
    [1, 1, 5, 3],
    [1, 1, 5, 5],
    [1, 3, 1, 1],
    [1, 3, 1, 3],
    [1, 3, 1, 5],
    [1, 3, 3, 1],
    [1, 3, 3, 3],
    [1, 3, 3, 5],
    [1, 3, 5, 1],
    [1, 3, 5, 3],
    [1, 3, 5, 5],
    [1, 5, 1, 1],
    [1, 5, 1, 3],
    [1, 5, 1, 5],
    [1, 5, 3, 1],
    [1, 5, 3, 3],
    [1, 5, 3, 5],
    [1, 5, 5, 1],
    [1, 5, 5, 3],
    [1, 5, 5, 5],
    [3, 1, 1, 1],
    [3, 1, 1, 3],
    [3, 1, 1, 5],
    [3, 1, 3, 1],
    [3, 1, 3, 3],
    [3, 1, 3, 5],
    [3, 1, 5, 1],
    [3, 1, 5, 3],
    [3, 1, 5, 5],
    [3, 3, 1, 1],
    [3, 3, 1, 3],
    [3, 3, 1, 5],
    [3, 3, 3, 1],
    [3, 3, 3, 3],
    [3, 3, 3, 5],
    [3, 3, 5, 1],
    [3, 3, 5, 3],
    [3, 3, 5, 5],
    [3, 5, 1, 1],
    [3, 5, 1, 3],
    [3, 5, 1, 5],
    [3, 5, 3, 1],
    [3, 5, 3, 3],
    [3, 5, 3, 5],
    [3, 5, 5, 1],
    [3, 5, 5, 3],
    [3, 5, 5, 5],
    [5, 1, 1, 1],
    [5, 1, 1, 3],
    [5, 1, 1, 5],
    [5, 1, 3, 1],
    [5, 1, 3, 3],
    [5, 1, 3, 5],
    [5, 1, 5, 1],
    [5, 1, 5, 3],
    [5, 1, 5, 5],
    [5, 3, 1, 1],
    [5, 3, 1, 3],
    [5, 3, 1, 5],
    [5, 3, 3, 1],
    [5, 3, 3, 3],
    [5, 3, 3, 5],
    [5, 3, 5, 1],
    [5, 3, 5, 3],
    [5, 3, 5, 5],
    [5, 5, 1, 1],
    [5, 5, 1, 3],
    [5, 5, 1, 5],
    [5, 5, 3, 1],
    [5, 5, 3, 3],
    [5, 5, 3, 5],
    [5, 5, 5, 1],
    [5, 5, 5, 3],
    [5, 5, 5, 5],
];

var activationFuncs = ['relu'];

async function main() {
    fs.writeFileSync('./report.txt', '', 'utf8');

    for (let node = 0; node < nodes.length; node++) {
        for (let unit = 0; unit < units.length; unit++) {
            for (let activationFunc = 0; activationFunc < activationFuncs.length; activationFunc++) {
                async function run() {
                    await new Promise((resolve) => {
                        var history = [];

                        var fitParam = {
                            epochs: 100,
                            callbacks: {
                                onEpochEnd: function (epoch, logs) {
                                    console.log('epoch', epoch, logs, 'RMSE -> ', Math.sqrt(logs.loss));
                                    history.push(logs);
                                },
                            },
                        };

                        console.log(nodes[node], units[unit], activationFuncs[activationFunc]);

                        var model = null;
                        if (nodes[node] == 1) {
                            model = modelCreateDepth1(units[unit][0], activationFuncs[activationFunc]);
                            unit += 26;
                            fs.appendFileSync('./report.txt', nodes[node] + ', [' + units[unit][0] + '], ' + activationFuncs[activationFunc] + '\n', 'utf8');
                        } else if (nodes[node] == 2) {
                            model = modelCreateDepth2(units[unit][0], units[unit][1], activationFuncs[activationFunc]);
                            unit += 8;
                            fs.appendFileSync('./report.txt', nodes[node] + ', [' + units[unit][0] + ', ' + units[unit][1] + '], ' + activationFuncs[activationFunc] + '\n', 'utf8');
                        }
                        if (nodes[node] == 3) {
                            model = modelCreateDepth3(units[unit][0], units[unit][1], units[unit][2], activationFuncs[activationFunc]);
                            unit += 2;
                            fs.appendFileSync(
                                './report.txt',
                                nodes[node] + ', [' + units[unit][0] + ', ' + units[unit][1] + ', ' + units[unit][2] + '], ' + activationFuncs[activationFunc] + '\n',
                                'utf8'
                            );
                        } else {
                            model = modelCreateDepth4(units[unit][0], units[unit][1], units[unit][2], units[unit][3], activationFuncs[activationFunc]);
                            fs.appendFileSync(
                                './report.txt',
                                nodes[node] + ', [' + units[unit][0] + ', ' + units[unit][1] + ', ' + units[unit][2] + ', ' + units[unit][3] + '], ' + activationFuncs[activationFunc] + '\n',
                                'utf8'
                            );
                        }

                        /*
                        model.fit(trainDataTensor, trainLabelTensor, fitParam).then(async function (result) {
                            for (let his = 0; his < history.length; his++) {
                                fs.appendFileSync('./report.txt', 'epoch: ' + his + ', loss: ' + history[his].loss + '\n', 'utf8');
                            }

                            var validationResult = model.predict(validationDataTensor);
                            validationResult = Array.from(validationResult.dataSync());

                            var validationAnswer = Array.from(validationLabelTensor.dataSync());

                            var good = 0;
                            var noGood = 0;

                            var checkPoints = [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];

                            for (let checkPoint = 0; checkPoint < checkPoints.length; checkPoint++) {
                                for (let i = 0; i < validationResult.length; i++) {
                                    if (
                                        (validationResult[i] > checkPoints[checkPoint] && validationAnswer[i] > checkPoints[checkPoint]) ||
                                        (validationResult[i] <= checkPoints[checkPoint] && validationAnswer[i] <= checkPoints[checkPoint])
                                    ) {
                                        good++;
                                    } else {
                                        noGood++;
                                    }
                                }

                                console.log(checkPoints[checkPoint] + ' : ' + good + ', ' + noGood);
                                fs.appendFileSync('./report.txt', checkPoints[checkPoint] + ' : ' + good + ', ' + noGood + '\n', 'utf8');

                                good = 0;
                                noGood = 0;
                            }

                            model.save('file://./myModelTest').then(async function () {
                                console.log('Successfully saved the artifacts.');
                                fs.appendFileSync('./report.txt', '====================\n', 'utf8');
                                resolve();
                            });
                        });
                        */
                    });
                }

                await run();
            }
        }
    }
}

main();
