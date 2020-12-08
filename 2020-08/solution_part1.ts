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

while(true){
//    stackPos++;
    //console.log("🧮 stack pos ",stackPos,":  checking...");
    let found = stackPosVisited.find((i)=>i==stackPos)!==undefined;
    if (found){
        console.log("❌ stack pos ",stackPos,": already in visited list. dying.");
        break;
    }
    stackPosVisited.push(stackPos);
    let instr = inp[stackPos].split(" ");
    console.log("✅ stack pos ",stackPos,": not executed yet, executing...",instr[0],instr[1]);
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
console.log("☠ beep boop console dead.");
console.log("💀💀💀 An stack dump occoured, here is the last known stack position before death: 💀💀💀");
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

console.log(globalReg);