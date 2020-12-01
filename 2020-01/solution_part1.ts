import * as fs from 'fs';

var inpstr = fs.readFileSync("input.txt",{encoding: 'utf-8'});
var inp = [];
inpstr.split("\n").forEach((a)=> {
    inp.push(parseInt(a));
})

let mul = [];

for (let i = 0; i < inp.length; i++){
    for (let j = i+1; j<inp.length; j++){
        //console.log((parseInt(inp[i]) + parseInt(inp[j])));
        if ((parseInt(inp[i]) + parseInt(inp[j])) === 2020){
            console.log("found 2020! - " + inp[i] + " | " + inp[j]);
            mul.push(parseInt(inp[i]) * parseInt(inp[j]));
        }
    }
}

console.log(mul);