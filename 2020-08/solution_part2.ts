import { group } from 'console';
import * as fs from 'fs';
import { inspect } from 'util';

var inpstr = fs.readFileSync("input.txt", { encoding: 'utf-8' })
var inp: string[] = [];

inp = inpstr.replace(/\r/g, '').split("\n");
console.log("🤖 beep boop console ready, booting.");
let globalReg = 0;
let stackPos = 0;
let stackPosVisited = [];
let flipped = -1;
let stackExecution = [];
while(true){
//    stackPos++;
    //console.log("🧮 stack pos ",stackPos,":  checking...");
    if (stackPos >= inp.length){
        console.log("✅✅✅ Boot process completed! ✅✅✅");
        break;
    }

    let found = stackPosVisited.find((i)=>i==stackPos)!==undefined;
    if (found){
        console.log("❌ stack pos ",stackPos,": already in visited list. trying to recover...");
        if (flipped >= 0){
            console.log("⏪ rewinding to",flipped,"...");
            while (stackExecution.length>0&&stackPos!==flipped)
            {
                let o = stackExecution.pop();
                console.log("⏪ rewinding to",flipped,": undo ",o[0],o[1]);
                stackPos = o[0];
                globalReg = o[2];
            }
            if (stackExecution.length == 0)
            {
                break;
            }
            flipped = -1;
        }
        while (stackExecution.length>0){
            let o = stackExecution.pop();
            stackPos = o[0];
            globalReg = o[2];
            console.log("⏪ undo ",o[0],o[1]);
            if (o[1] == "nop"){
                inp[stackPos] = "jmp"+inp[stackPos].slice(3);
                flipped = stackPos;
                console.log("⏪ flipped NOP to JMP: ",inp[stackPos]);
                break;
            }
            if (o[1] == "jmp"){
                inp[stackPos] = "nop"+inp[stackPos].slice(3);
                flipped = stackPos;
                console.log("⏪ flipped JMP to NOP: ",inp[stackPos]);
                break;
            }
        }
        if (stackExecution.length == 0)
        {
            break;
        }

    }
    stackPosVisited.push(stackPos);
    let instr = inp[stackPos].split(" ");
    stackExecution.push([stackPos,instr[0],globalReg]);
    console.log("✅ stack pos ",stackPos,": not executed yet, executing...",instr[0],instr[1], globalReg);
    switch(instr[0])
    {
        case "nop":
            stackPos++;
            break;
        case "acc":
            globalReg = globalReg + parseInt(instr[1]);
            stackPos++;
            break;
        case "jmp":
            stackPos = stackPos + parseInt(instr[1]);
            break;
        default:
            break;
    }

}
//console.log("☠ beep boop console dead.");
//console.log("💀💀💀 An stack dump occoured, here is the last known stack position before death: 💀💀💀");
for(let i = stackPos-3; i < stackPos+3; i++){
    if (i > 0 && i < inp.length){
        let oS = "";
        oS = i.toString();
        if (oS.length < 2)
            oS = " ".repeat(2-oS.length) + oS;
        if (i == stackPos)
            oS +=" >";
        else
            oS += "  ";
        oS += inp[i];
        console.log(oS);
    }
}
if (stackPos == inp.length)
    console.log("--- finished ---");

console.log(globalReg);