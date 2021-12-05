const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');
const arr = input.split('\n')

const positions = arr[0].length;
const oneCount = Array(positions).fill().map(() => 0);
const zeroCount = Array(positions).fill().map(() => 0);

const getMostOrLeastCommonBits = ({ positions, arr, getLeastCommon = false }) => {
    let bits = '';
    const oneCount = Array(positions).fill().map(() => 0);
    const zeroCount = Array(positions).fill().map(() => 0);
    for (let i = 0; i < arr.length; i++) {
        const row = arr[i];
        for (let j = 0; j < row.length; j++) {
            if (row[j] === '1') {
                oneCount[j] = oneCount[j] + 1
            } else if (row[j] === '0') {
                zeroCount[j] = zeroCount[j] + 1;
            }
        }
    }
    for (let p = 0; p < positions; p++) {
        if (oneCount[p] > zeroCount[p]) {
            bits += getLeastCommon ? '0' : '1';
        } else if (oneCount[p] === zeroCount[p]) {
            bits += getLeastCommon ? '0' : '1'
        }
        else {
            bits += getLeastCommon ? '1' : '0';
        }
    }
    return bits;
}

let workingArray = [...arr];
let commonBits = getMostOrLeastCommonBits({ positions, arr: workingArray });

let oxygen = '';
let co2 = '';

for (let i = 0; i < positions; i++) {
    workingArray = workingArray.filter(row => row[i] !== commonBits[i])
    commonBits = getMostOrLeastCommonBits({ positions, arr: workingArray });
    if (workingArray.length === 1) {
        oxygen = workingArray[0];
        break;
    }
}

workingArray = [...arr];
commonBits = getMostOrLeastCommonBits({ positions, arr: workingArray, getLeastCommon: true });

for (let i = 0; i < positions; i++) {
    workingArray = workingArray.filter(row => row[i] !== commonBits[i])
    commonBits = getMostOrLeastCommonBits({ positions, arr: workingArray, getLeastCommon: true });
    if (workingArray.length === 1) {
        co2 = workingArray[0];
        break;
    }
}

console.log({ oxygen, co2, oxygenInt: parseInt(oxygen, 2), co2Int: parseInt(co2, 2) })