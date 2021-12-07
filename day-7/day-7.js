const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');
let crabPosition = input.split(',').map((s) => parseInt(s));
let maxPosition = Math.max(...crabPosition);
let runningFuel = 0;
let minFuel = Infinity;

const addititiveFunction = (num) => {
    let sum = 0;
    for (i = 0; i <= num; i++) {
        sum += i;
    }
    return sum;
}

for (let i = 0; i < maxPosition; i++) {
    for (let j = 0; j < crabPosition.length; j++) {
        runningFuel += addititiveFunction(Math.abs(i - crabPosition[j]))
    }
    if (runningFuel < minFuel) {
        minFuel = runningFuel
    }
    runningFuel = 0;
}

console.log(minFuel)