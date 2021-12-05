const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8');
const arr = input.split('\n').map(i => parseInt(i))
let count = 0;

for (let i = 2; i < arr.length; i++) {
    const windowOne = (arr[i] + arr[i - 1] + arr[i - 2]);
    const windowTwo = (arr[i + 1] + arr[i] + arr[i - 1]);
    if ((windowTwo - windowOne) > 0) {
        count++;
    }
}

console.log(count)