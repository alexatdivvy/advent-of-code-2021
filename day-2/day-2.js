const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');
const arr = input.split('\n')

let depth = 0;
let horizontal = 0;
let aim = 0;

for (let i = 0; i < arr.length; i++) {
    const [cmd, magnitudeStr] = arr[i].split(' ')
    const magnitude = parseInt(magnitudeStr);

    if (cmd === 'up') {
        aim -= magnitude;
    } else if (cmd === 'down') {
        aim += magnitude;
    } else if (cmd === 'forward') {
        horizontal += magnitude;
        depth += (aim * magnitude);
    }
}

console.log({ depth, horizontal });