import * as fs from 'fs';
import { argv } from 'process';


console.log("Using: ",argv[2]);
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
/*console.log(inspect(busIdsStr));
console.log(inspect(busIds));*/
let noSolution = true;
let nextIndex = -1;
let i = 100047700000002;
let combo = -1;
var logInt = 0;
console.log("🧩 Starting solve...");
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

    if ((i % busIds[nextIndex] === 0 || (busIds[nextIndex]) < 0) || i === 0) {
        //console.log("index up!",busIds[nextIndex]);
        nextIndex++;
        i++;
    } else {
        if (nextIndex >= combo) {
            combo = nextIndex;
            console.log("Combo breaker -> max index: ", combo, "@ i =", i," - wants:",busIds.length, "broke at:",busIds[nextIndex]);
        }
        nextIndex = -1;
        if (i>0){
            //console.log(i,"adding",busIds[0] - (i % busIds[0]), "to reach",busIds[0])
            i = i + (busIds[0]-(i % busIds[0]));
        }
        else 
            i = i + 1;

        if (Math.floor(i / 100000000) > logInt){
            logInt = Math.floor(i / 100000000);
            console.log("i now",i);
        }
    }
    if (i >= Number.MAX_SAFE_INTEGER - 5)  {
        console.log("BROKE.");
        break;
    }
}
