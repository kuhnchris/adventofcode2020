import * as fs from 'fs';
import { argv } from 'process';


function lcm_two_numbers(x, y) {
    if ((typeof x !== 'number') || (typeof y !== 'number'))
        return false;
    return (!x || !y) ? 0 : Math.abs((x * y) / gcd_two_numbers(x, y));
}

function gcd_two_numbers(x, y) {
    x = Math.abs(x);
    y = Math.abs(y);
    while (y) {
        var t = y;
        y = x % y;
        x = t;
    }
    return x;
}

console.time("start");
console.log("Using: ", argv[2]);
var inpstr = fs.readFileSync(argv[2], { encoding: 'utf-8' });
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
    } else {
        busIds.push(-1);
    }
});
let highestBusIdIdx = busIds.findIndex(q => q == highestBusId);
/*console.log(inspect(busIdsStr));
console.log(inspect(busIds));*/
let noSolution = true;
let nextIndex = -1;

// > 101376900000010
// > 100289179891892
let i = 0;
let combo = -1;
let prevI = 0;
let prevC = -1;
let iDiff = 1;
var logInt = 0;
let resetAgain = false;
console.log("🧩 Starting solve...");
let outBuff = {};
while (noSolution) {


    if (nextIndex < 0) {
        //Resetting
        nextIndex = 0;
        //console.log("Resetted Index. :-(",nextIndex);
    }
    if (nextIndex >= busIds.length) {
        noSolution = false;
        console.log("finished!", (i - (busIds.length)));
        break;
    }
    if (i % busIds[highestBusIdIdx] == 0 && i > 0) {
        let found = true;
        //console.log(outBuff[i]);
        //console.log("found: ", highestBusIdIdx, " - i: ", i);
        for (let q = 1; q < highestBusIdIdx+1; q++) {
            //console.log(outBuff[i - q]);
            //console.log("q:", q, "-", i - q, highestBusIdIdx - q);
            if ((i-q) % busIds[(highestBusIdIdx - q)] != 0 && busIds[(highestBusIdIdx - q)] >= 0) {
                found = false;
                //console.log("(👇) not found: id:", q, " (=", busIds[highestBusIdIdx - q], ") - pos: ", (highestBusIdIdx - q));
            }
        }
        if (found) {
            for (let q = highestBusIdIdx; q < busIds.length; q++) {
                //console.log(outBuff[i + q-highestBusIdIdx]);
                if ((i + q-highestBusIdIdx) % busIds[q]  != 0) {
                    found = false;
                    //console.log("(👆) not found", q, " -", busIds[q], " - i+q-highestBusIdIdx", (i + q-highestBusIdIdx));
                }
            }
            if (found) {
                outBuff = {};
                for (let j = -20; j < 20; j++) {
                    let oStr;
                    oStr = (i + j).toString().padEnd(5, " ");
                    busIds.forEach(b => {
                        if (b < 0)
                            oStr = oStr + "  /  ";
                        else if ((i + j) % b == 0)
                            oStr = oStr + "  D  ";
                        else
                            oStr = oStr + "  .  ";
                    });
                    //console.log(oStr);
                    outBuff[(i + j)] = oStr;
                }
                for(let z = i-highestBusIdIdx-10; z < i-highestBusIdIdx+10;z++)
                    console.log(outBuff[z]);
                    
                console.log("solution: ", i-highestBusIdIdx);
                break;
            }
        }
        resetAgain = true;
    }

    /*
    let xx = (busIds[highestBusIdIdx] - (busIds[highestBusIdIdx] % i));
    if (busIds[highestBusIdIdx] < 0)
        i = i + 1;
    else if (xx > 0)
        i = i + xx;
    else
        i = i + busIds[highestBusIdIdx];*/
    if (resetAgain) {
        i = i + busIds[highestBusIdIdx] - 4;
        resetAgain = false;

    } else { i++; }


    /*
    if (busIds[nextIndex] % i == 0 || i == 0 || busIds[nextIndex] < 0) {
        console.log("nextIndex!",nextIndex);
        nextIndex++;
        i++
    } else {
        let nI = nextIndex;
        while (busIds[nI] < 0)
            nI--;
        i = i + busIds[nI] - nextIndex;
        for (let q = i; q >= i-3; i--){

        }
        console.log(i,nI,busIds[nI]);
    }*/

    logInt++;
    if (logInt >= 100000000) {
        logInt = 0;
        console.log("Status:", i);
    }

    if (i >= Number.MAX_SAFE_INTEGER - 5) {
        console.log("BROKE.");
        break;
    }
}
console.timeEnd("start");