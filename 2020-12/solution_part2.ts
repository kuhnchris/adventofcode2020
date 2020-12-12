import * as fs from 'fs';
import { inspect } from 'util';

var inpstr = fs.readFileSync("input.txt", { encoding: 'utf-8' })
var inp: string[] = [];

inp = inpstr.replace(/\r/g, '').split("\n");

// start position: 0/0 east
let posX = 0;
let posY = 0;
let waypointX = 10;
let waypointY = -1;
let dir = 90;
let nmbrs;
let oldDir;
let store;
inp.forEach((d) => {
    switch (d[0]) {
        case "F":
            nmbrs = parseInt(d.slice(1));
            console.log("🚢 moving towards 🎯 (", waypointX, "/", waypointY, ") from 🚢 (", posX, "/", posY, ") ", nmbrs, "times.");
            for (let i = 0; i < nmbrs; i++) {
                posX += waypointX;
                posY += waypointY;
                //console.log("🚢 (", posX, "/", posY, ")...");
            }
            console.log("🚢 now at", posX, posY);
            break;
        case "R":
            nmbrs = parseInt(d.slice(1));
            console.log("🎯↩ Waypoint starts turning right...", waypointX, "/", waypointY, nmbrs, "°");
            let origNmbrs = nmbrs;
            while (nmbrs > 360)
                nmbrs = nmbrs - 360;
            while (nmbrs < 0)
                nmbrs = 360 + nmbrs;

            while (nmbrs > 0) {
                // 90 -> = N->E/S->W and E->S/W->N (N->E E->S S->W W->N)
                store = waypointX;
                waypointX = waypointY * -1;
                waypointY = store;
                nmbrs = nmbrs - 90;
                console.log("🎯↩ Waypoint turns... x:", waypointX, "/ y:", waypointY, nmbrs, "° left to turn");
            }
            break;
        case "L":
            nmbrs = parseInt(d.slice(1));
            console.log("🎯↩ Waypoint starts turning left...", waypointX, "/", waypointY, nmbrs, "°");
            while (nmbrs > 360)
                nmbrs = nmbrs - 360;
            while (nmbrs < 0)
                nmbrs = 360 + nmbrs;
            while (nmbrs > 0) {
                // -90 -> = N->E/S->W and E->S/W->N (N->E E->S S->W W->N)
                store = waypointX;
                waypointX = waypointY;
                waypointY = store * -1;
                nmbrs = nmbrs - 90;
                console.log("🎯↩ Waypoint turns... x:", waypointX, "/ y:", waypointY, nmbrs, "° left to turn");
            }
            break;
        case "N":
            nmbrs = parseInt(d.slice(1));
            waypointY -= nmbrs;
            console.log("🎯👆 Waypoint goes north", waypointY);
            break;
        case "E":
            nmbrs = parseInt(d.slice(1));
            waypointX += nmbrs;
            console.log("🎯-> Waypoint goes east", waypointX);
            break;
        case "S":
            nmbrs = parseInt(d.slice(1));
            waypointY += nmbrs;
            console.log("🎯👇 Waypoint goes south", waypointY);
            break;
        case "W":
            nmbrs = parseInt(d.slice(1));
            waypointX -= nmbrs;
            console.log("🎯<- Waypoint goes west", waypointX);
            break;
        default:
            console.log("❌❌ Ship kaputt.", d);
            break;
    }
})

console.log("Ship at: ", posX, "/", posY, "-", dir, "°");
console.log("Manhatten Distance: ", (Math.abs(posX) + Math.abs(posY)));
