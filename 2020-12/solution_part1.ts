import { group } from 'console';
import * as fs from 'fs';
import { isBreakStatement, isNonNullChain } from 'typescript';
import { inspect } from 'util';

var inpstr = fs.readFileSync("input.txt", { encoding: 'utf-8' })
var inp: string[] = [];

inp = inpstr.replace(/\r/g, '').split("\n");

// start position: 0/0 east
let posX = 0;
let posY = 0;
let dir = 90;
let nmbrs;
let oldDir;
inp.forEach((d) => {
    switch (d[0]) {
        case "F":
            nmbrs = parseInt(d.slice(1));
            if (dir == 90) {
                console.log("🚢 Ship go forward (east).", dir, nmbrs);
                posX += nmbrs;
            }
            else if (dir == 180) {
                console.log("🚢 Ship go forward (south).", dir, nmbrs);
                posY += nmbrs;
            }
            else if (dir == 270) {
                console.log("🚢 Ship go forward (west).", dir, nmbrs);
                posX -= nmbrs;
            }
            else if (dir == 0 || dir == 360) {
                console.log("🚢 Ship go forward (north).", dir, nmbrs);
                posY -= nmbrs;
            } else {
                console.log("❌ Ship confuse. :(", dir, nmbrs);
            }
            break;
        case "R":
            nmbrs = parseInt(d.slice(1));
            oldDir = dir;
            dir = dir + nmbrs;
            while (dir >= 360)
                dir = dir - 360;
            console.log("🚢↩ Ship turn right", oldDir, nmbrs, dir);
            break;
        case "L":
            nmbrs = parseInt(d.slice(1));
            oldDir = dir;
            dir = dir - nmbrs;
            while (dir < 0)
                dir = 360 + dir;
            console.log("🚢↪ Ship turn left", oldDir, nmbrs, dir);
            break;
        case "N":
            nmbrs = parseInt(d.slice(1));
            posY -= nmbrs;
            console.log("🚢👆 Ship goes north", posX, posY, nmbrs);
            break;
        case "E":
            nmbrs = parseInt(d.slice(1));
            posX += nmbrs;
            console.log("🚢👉 Ship goes east", posX, posY, nmbrs);
            break;
        case "S":
            nmbrs = parseInt(d.slice(1));
            posY += nmbrs;
            console.log("🚢👇 Ship goes south", posX, posY, nmbrs);
            break;
        case "W":
            nmbrs = parseInt(d.slice(1));
            posX -= nmbrs;
            console.log("🚢👈 Ship goes west", posX, posY, nmbrs);
            break;
        default:
            console.log("❌❌ Ship kaputt.",d);
            break;
    }
})

console.log("Ship at: ",posX,"/",posY,"-",dir,"°");
console.log("Manhatten Distance: ",(Math.abs(posX)+Math.abs(posY)));
