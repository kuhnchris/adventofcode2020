import * as fs from 'fs';

var inpstr = fs.readFileSync("input.txt", { encoding: 'utf-8' });
var inp = [];
inpstr.split("\n").forEach((a) => {
    inp.push(parseInt(a));
})

let mul = [];

for (let i = 0; i < inp.length; i++) {
    for (let j = i + 1; j < inp.length; j++) {
        for (let k = j + 1; k < inp.length; k++) {
            if ((inp[i] + inp[j] + inp[k]) === 2020) {
                console.log("found 2020! - " + inp[i] + " | " + inp[j] + " | " + inp[k]);
                mul.push(inp[i] * inp[j] * inp[k]);
            }
        }
    }
}

console.log(mul);