import * as fs from 'fs';

var inpstr = fs.readFileSync("input.txt", { encoding: 'utf-8' });
var inp: string[] = [];
inp = inpstr.split("\n");

// map repeats to the right
// map needs to be at least (lines count) * 3 width
// as counting is 3 right 1 down

var initMapWidth = inp[0].length;
var initMapHeight = inp.length;


var widestSlope = 3;
var mul = (Math.floor(initMapHeight / initMapWidth) + 1) * widestSlope;
var finalMapWidth = initMapWidth * mul;

var newMap = [];
inp.forEach((l) => {
    var newLine = "";
    for (let i = 0; i < mul; i++) {
        newLine = newLine + l.replace("\r", "");
    }
    newMap.push(newLine);
});

// newMap now contains the full extended map

console.log("Initial map: " + initMapWidth + " x " + initMapHeight);
console.log("Multiplicator for width: " + mul);
console.log("Final map: " + finalMapWidth + " " + initMapHeight);

//newMap.forEach((l)=>console.log(l));

let trees = 0;
let curWidth = 0;
let curHeight = 0;
while (curHeight < initMapHeight) {
    curWidth = curWidth + 3;
    curHeight = curHeight + 1;
    if (curHeight < initMapHeight && curWidth <= finalMapWidth) {
        if (newMap[curHeight][curWidth] === "#") {
            //newMap[curHeight][curWidth] = 'X';
            newMap[curHeight] = newMap[curHeight].slice(0, curWidth) + 'X' + newMap[curHeight].slice(curWidth + 1);
            trees++;
        } else {
            newMap[curHeight] = newMap[curHeight].slice(0, curWidth) + 'O' + newMap[curHeight].slice(curWidth + 1);
        }
    }
}

//newMap.forEach((l)=>console.log(l));
var html = "<html><head><style>.X { background-color: red; } .O { background-color: green; }</style></head><body style='font-family: monospace;'>";
newMap.forEach((l) => {
    html += "<div>";
    for (let i = 0; i < l.length; i++) {
        let c = l[i];
        if (c === '.' || c === '#')
            html += c;
        else
            html += "<span class='" + c + "'>" + c + "</span>";
    }
    html += "</div>";
});
html += "</body></html>";
fs.writeFileSync("result.html", html);
console.log("Collided with trees: " + trees);