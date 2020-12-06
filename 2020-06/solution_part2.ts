import { group } from 'console';
import * as fs from 'fs';
import { inspect } from 'util';

var inpstr = fs.readFileSync("input.txt", { encoding: 'utf-8' })
var inp: string[] = [];

inp = inpstr.replace(/\r/g, '').replace(/\n\n/g, '#').split("#");
console.log("groups:", inp.length);

let groupCount = 0;
inp.forEach((g) => {
    var gg = g.split("\n");
    console.log("🔍 checking: ",gg,"(",gg.length," answers in group)");
    // just check first line ([0], as *everyone* must contain char)
    for(let i = 0; i < gg[0].length; i++){
        let checks = 0;
        for (let j = 0; j < gg.length; j++){
            if (gg[j].indexOf(gg[0][i]) >= 0)
                checks++;
        }
        if (checks == gg.length){
            console.log("👍 char '",gg[0][i],"' in everyone's answer. (",checks," of ",gg.length," answers)");
            groupCount++;
        }
        else
            console.log("👎 char '",gg[0][i],"' not contained in everyone's answer. (",checks," of ",gg.length," answers)");
    }
})

console.log("🤖 beep boop computed: ",groupCount);