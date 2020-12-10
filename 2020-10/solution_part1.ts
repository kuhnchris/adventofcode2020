import { group } from 'console';
import * as fs from 'fs';
import { isNonNullChain } from 'typescript';
import { inspect } from 'util';

var inpstr = fs.readFileSync("input.txt", { encoding: 'utf-8' })
var inp: string[] = [];

inp = inpstr.replace(/\r/g, '').split("\n");
var inpNmbrs = [];
inp.forEach(a=>{
    inpNmbrs.push(parseInt(a));
})
inpNmbrs = inpNmbrs.sort((a,b)=>{return a<b?-1:1});
let currentJoltage = 0;


var diffNmbrs = {0: 0, 1: 0, 2: 0,3:0};
inpNmbrs.forEach((i)=> {
    console.log("⚡ joltage: " + currentJoltage + " - adding adaptor: "+i);
    diffNmbrs[i-currentJoltage]++;
    currentJoltage = i;
});
// the 3 jolts diff are the last 3 from the adaptor
diffNmbrs[3]++;
currentJoltage = currentJoltage + 3;
console.log(inspect(diffNmbrs));
console.log("🔌 Final Joltage: " + currentJoltage);
console.log("🔼 Changes: ",diffNmbrs[1],"x 1,",diffNmbrs[2],"x 2,",diffNmbrs[3],"x 3");
console.log("🧩 Answer: ",diffNmbrs[1] * diffNmbrs[3]);
