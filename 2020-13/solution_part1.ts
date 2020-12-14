import { group } from 'console';
import * as fs from 'fs';
import { inspect } from 'util';
import * as chalk from 'chalk';

var inpstr = fs.readFileSync("input.txt", { encoding: 'utf-8' })
var inp: string[] = [];

inp = inpstr.replace(/\r/g, '').split("\n");
let departTime = parseInt(inp[0]);
let busIdsStr = inp[1].split(",");
let busIds = [];

let highestBusId = 0;
busIdsStr.forEach(b => {
    let intId = parseInt(b);
    if (!isNaN(intId)) {
        busIds.push(intId);
        if (intId > highestBusId)
            highestBusId = intId;
    }
});

let tickTable = {};

for (let i = 0; i < departTime + highestBusId; i++) {
    let busArr = [];
    busIds.forEach(b => {
        if (i === 0 || i % b == 0) {
            busArr.push(b);
        }
    });
    tickTable[i] = busArr;
}

var lStr = "time ";
busIds.forEach(b => {
    lStr = lStr + " " + b.toString().padEnd(3, " ") + " ";
});
console.log(lStr);

let nextBusTick = departTime+1000;
let nextBusId = -1;
for (let i = departTime - 10; i < departTime + 10; i++) {
    
    let oStr;
    if (i===departTime)
        oStr = chalk.magenta(chalk.bold(i.toString().padEnd(5, " ")));
    else
        oStr = i.toString().padEnd(5, " ");
    busIds.forEach(b => {
        if (tickTable[i].findIndex(t => b == t) > -1){
            let v = "  D  ";
            
            if (nextBusTick > i && i >= departTime) {
                nextBusTick = i;
                nextBusId = b;
                v=chalk.redBright(v);
            }
            oStr = oStr + v;
        }
        else
            oStr = oStr + "  .  ";
    });
    console.log(oStr);
}

console.log("Bus",nextBusId,"departs",nextBusTick, "so you wait", (nextBusTick-departTime),"minutes, multiplied by bus ID is:",(nextBusTick-departTime)*nextBusId);