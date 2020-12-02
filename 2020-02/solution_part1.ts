import * as fs from 'fs';

var inpstr = fs.readFileSync("input.txt",{encoding: 'utf-8'});
var inp = [];


inp = inpstr.split("\n");

var valid = 0;
inp.forEach((line) => {
    let delim = line.split(" ");
    let minMax = delim[0].split("-");
    let minAmount = parseInt(minMax[0]);
    let maxAmount = parseInt(minMax[1]);
    let amount = 0;
    let findChar = delim[1][0];
    for(let i = 0; i < delim[2].length; i++){
        if (delim[2][i] === findChar)
            amount++;
    }
    if (amount >= minAmount && amount <= maxAmount)
        valid++;
});
console.log(valid);