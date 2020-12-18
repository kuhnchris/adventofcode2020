import * as fs from 'fs';
import { inspect } from 'util';

var inpstr = fs.readFileSync("input.txt", { encoding: 'utf-8' })
var inp: string[] = [];

inp = inpstr.replace(/\r/g, '').split("\n");

let startNumbs = inp[0].split(",");
let turn = 0;
let turnTable = {};
let lastNumber = "0";
while (turn < 30000000){
    turn++;
    if ((turn-1) < startNumbs.length){
        turnTable[startNumbs[(turn-1)]] = { "last": turn, "curr": turn };
        lastNumber = startNumbs[(turn-1)];
        console.log("🌠 turn ",turn,"adding number",lastNumber);
    } else {
        if (turn % 10000 == 0)
            console.log("🎲 turn ",turn,": checking",lastNumber);
        if (lastNumber in turnTable){
            //console.log("🎲! turn ",turn,":",lastNumber,"was spoken before, so: ",turnTable[lastNumber].curr,"-",turnTable[lastNumber].last, "so...");
            lastNumber = (turnTable[lastNumber].curr - turnTable[lastNumber].last).toString();
            //console.log("🎲! turn ",turn,":",lastNumber);
            if (lastNumber in turnTable)
                turnTable[lastNumber] = {"last": turnTable[lastNumber].curr, "curr": turn};
            
        } else {
            turnTable[lastNumber] = {"last": turn - 1, "curr": turn - 1};
            lastNumber = "0";
            //console.log("🎲. turn ",turn,": is new, so lastNumber = ",lastNumber);
            if (lastNumber in turnTable)
                turnTable[lastNumber] = {"last": turnTable[lastNumber].curr, "curr": turn};

        }
    }
}
console.log("🧩 2020th number is:",lastNumber);