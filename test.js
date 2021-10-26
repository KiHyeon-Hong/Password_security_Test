const fs = require('fs');
const SimpleROC = require(__dirname + '/SimpleROC');

const roc = SimpleROC.simpleROC([23, 22, 21, 20, 19, 18, 17, 16, 15, 14], [1, 1, 1, 1, 1, 0, 0, 0, 0, 0], 10);
console.log(`${roc[0]}`);
console.log(`${roc[1]}`);
console.log(`${roc[2]}`);

const roc_reverse = SimpleROC.simpleROC_reverse([23, 22, 21, 20, 19, 18, 17, 16, 15, 14], [0, 0, 0, 0, 0, 1, 1, 1, 1, 1], 10);
console.log(`${roc_reverse[0]}`);
console.log(`${roc_reverse[1]}`);
console.log(`${roc_reverse[2]}`);
