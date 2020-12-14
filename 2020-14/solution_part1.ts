import * as fs from 'fs';
import { forEachLeadingCommentRange, ObjectFlags } from 'typescript';
import { inspect } from 'util';

var inpstr = fs.readFileSync("input.txt", { encoding: 'utf-8' })
var inp: string[] = [];

inp = inpstr.replace(/\r/g, '').split("\n");

let mem = {};
let activeMask = "";
inp.forEach((line)=> {
    let l = line.split(" = ");
    if (l[0] == "mask"){
        activeMask = l[1];
        console.log("🎭 set mask to ",activeMask);
    } else {
        let memObj = l[0].split("[")[1].split("]")[0];
        let val = parseInt(l[1]);
        let valBinary = val.toString(2).padStart(36,"0");
        console.log("💾 trying to assign mem[",memObj,"] with val ",val,"(binary, reversed = ",valBinary,")");
        if (activeMask != ""){
            console.log("💿 applying mask",activeMask,"to",valBinary);
            for(let i = 0; i < activeMask.length;i++){
                if (activeMask[i] != "X"){
                    valBinary = valBinary.slice(0,i)+activeMask[i]+valBinary.slice(i+1);
                    console.log("💿 ->",valBinary);
                }
            }
        }
        mem[memObj] = parseInt(valBinary,2);
    }

});

console.log(inspect(mem));

let sum = 0;
Object.keys(mem).forEach((o)=>{
    sum = sum+mem[o];
});
console.log("🧩 solution: ",sum);