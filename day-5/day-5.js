const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');
const arr = input.split('\n')
const GRID_SIZE = 1000;

const grid = Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill().map(() => 0));

// 754,974 -> 17,974
const getIndecesFromPoints = (x1, y1, x2, y2) => {
    const points = [];
    if (x1 === x2) {
        const dist = y2 - y1;
        for (let i = 0; i < Math.abs(dist) + 1; i++) {
            points.push([x1, dist < 0 ? y1 - i : y1 + i])
        }
    } else if (y1 === y2) {
        const dist = x2 - x1;
        for (let i = 0; i < Math.abs(dist) + 1; i++) {
            points.push([dist < 0 ? x1 - i : x1 + i, y2])
        }
    } else {
        const distX = x2 - x1;
        const distY = y2 - y1;
        for (let i = 0; i < Math.abs(distX) + 1; i++) {
            points.push([distX < 0 ? x1 - i : x1 + i, distY < 0 ? y1 - i : y1 + i])
        }

    }
    return points;
}

for (let i = 0; i < arr.length; i++) {
    const pairs = arr[i].split(' -> ');
    const [x1, y1] = pairs[0].split(',')
    const [x2, y2] = pairs[1].split(',')
    const lineCoordinates = getIndecesFromPoints(parseInt(x1), parseInt(y1), parseInt(x2), parseInt(y2));
    for (let j = 0; j < lineCoordinates.length; j++) {
        const [x, y] = lineCoordinates[j];
        grid[x][y] = grid[x][y] + 1
    }
}

const countRobustPoints = (grid) => {
    let count = 0;
    for (let i = 0; i < grid[0].length; i++) {
        for (let j = 0; j < grid.length; j++) {
            if (grid[i][j] >= 2) {
                count++;
            }
        }
    }
    return count;
}

console.log(countRobustPoints(grid));