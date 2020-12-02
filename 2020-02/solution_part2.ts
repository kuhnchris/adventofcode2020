import * as fs from 'fs';

var inpstr = fs.readFileSync("input.txt", { encoding: 'utf-8' });
var inp = [];


inp = inpstr.split("\n");

var valid = 0;
inp.forEach((line) => {
    let delim = line.split(" ");
    let minMax = delim[0].split("-");
    let minIndex = parseInt(minMax[0]) - 1;
    let maxIndex = parseInt(minMax[1]) - 1;
    let findChar = delim[1][0];
    if ((delim[2][minIndex] === findChar || delim[2][maxIndex] === findChar) && !(
        delim[2][minIndex] === findChar && delim[2][maxIndex] === findChar)
    )

        valid++;
}
);
console.log(valid);