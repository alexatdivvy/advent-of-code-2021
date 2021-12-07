const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');
let lanternFishArray = input.split(',').map((s) => parseInt(s));
const MAX_LANTERN_FISH_AGE = 8;

const processDay = (lanternFishMap) => {
    const lanternFishCopy = { ...lanternFishMap }
    for (let lanternFish = 0; lanternFish <= MAX_LANTERN_FISH_AGE; lanternFish++) {
        if (lanternFish === 0) {
            fishToAdd = lanternFishMap['0'];
            delete lanternFishCopy['0'];
        } else {
            lanternFishCopy[lanternFish - 1] = (lanternFishMap[lanternFish] || 0);
        }
    }
    lanternFishCopy['8'] = fishToAdd;
    lanternFishCopy['6'] = fishToAdd + (lanternFishCopy['6'] || 0);
    return lanternFishCopy;
};

const makeLanternFishMap = (lanternFishArray) => {
    const lanternFishMap = {};
    for (let lanternFishIndex = 0; lanternFishIndex < lanternFishArray.length; lanternFishIndex++) {
        const fish = lanternFishArray[lanternFishIndex];
        lanternFishMap[fish] = lanternFishMap[fish] === undefined ? 1 : lanternFishMap[fish] + 1;
    }
    return lanternFishMap;
}

const getFishDays = (days) => {
    let lanternFishMap = makeLanternFishMap(lanternFishArray)
    for (let i = 0; i < days; i++) {
        lanternFishMap = processDay(lanternFishMap);
    }
    console.log(lanternFishMap, Object.values(lanternFishMap).reduce((sum, fish) => fish ? sum + fish : sum, 0))
}


getFishDays(256);
