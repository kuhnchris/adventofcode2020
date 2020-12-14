import * as fs from 'fs';
import { inspect } from 'util';

var inpstr = fs.readFileSync("input.txt", { encoding: 'utf-8' })
var inp: string[] = [];

inp = inpstr.replace(/\r/g, '').split("\n");

function doMemRepl(str, pos=0,val){
    let shouldSet = true;
    for(let i = pos; i < str.length; i++){
        if (str[i] == 'X')
        {
            str = str.slice(0,i)+"0"+str.slice(i+1);
            doMemRepl(str,pos,val);
            str = str.slice(0,i)+"1"+str.slice(i+1);
            doMemRepl(str,pos,val);
            shouldSet = false;
        }
    }
    if (shouldSet){
        //console.log("Setting: ",str,"to",val);
        mem[parseInt(str,2)] = val;
    }
}

let mem = {};
let activeMask = "";
inp.forEach((line)=> {
    let l = line.split(" = ");
    if (l[0] == "mask"){
        activeMask = l[1];
        console.log("🎭 set mask to ",activeMask);
    } else {
        let memObj = parseInt(l[0].split("[")[1].split("]")[0]);
        let val = parseInt(l[1]);
        let memBinary = memObj.toString(2).padStart(36,"0");
        let xAmount = 0;
        console.log("💾 trying to assign val ",val,"to ...",memObj);
        if (activeMask != ""){
            console.log("💿 applying mask to *memory address*",activeMask,"to",memBinary);
            for(let i = 0; i < activeMask.length;i++){
                if (activeMask[i] != "0"){
                    memBinary = memBinary.slice(0,i)+activeMask[i]+memBinary.slice(i+1);
                    //console.log("💿 ->",memBinary);
                    if (activeMask[i] == "X")
                        xAmount++;
                }
            }
        }
        doMemRepl(memBinary,0,val);
        //mem[parseInt(memBinary,2)] = val;
    }

});

//console.log(inspect(mem));

let sum = 0;
Object.keys(mem).forEach((o)=>{
    sum = sum+mem[o];
});
console.log("🧩 solution: ",sum);