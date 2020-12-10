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
let possibleAdapatorChain = 0;
function recursiveSolve(currJolt, path){
    //console.log("Current path...:",path,currJolt);
    path = path + " " + currJolt;
    if (currJolt == 0)
    {
        //console.log("Possible path: "+path);
        possibleAdapatorChain++;
        return;
    }

    for(let i = 1; i <= 3; i++){
        if (inpNmbrs.indexOf(currJolt-i) >= 0 || (currJolt-i) == 0)
        {
            recursiveSolve(currJolt-i, path);
        }
    }
}
recursiveSolve(currentJoltage, "");

console.log("🔗 Possible chain(s): ",possibleAdapatorChain);
