import { group } from 'console';
import * as fs from 'fs';
import { isNonNullChain } from 'typescript';
import { inspect } from 'util';

var inpstr = fs.readFileSync("input.txt", { encoding: 'utf-8' })
var inp: string[] = [];

inp = inpstr.replace(/\r/g, '').split("\n");
var mapWidth = inp[0].length;
var mapHeight = inp.length;

let mapNow = [];
let mapNewSim = [];
for (let h = 0; h < mapHeight; h++) {
    mapNow.push([]);
    for (let w = 0; w < mapWidth; w++) {
        mapNow[h].push(inp[h][w]);
    }
}

function sim() {
    mapNewSim = [];
    for (let h = 0; h < mapHeight; h++) {
        mapNewSim.push([]);
        for (let w = 0; w < mapWidth; w++) {
            if (mapNow[h][w] == ".")
                mapNewSim[h].push(".");
            else {
                let occupiedSeats = 0;
                if (w - 1 >= 0) { // left
                    if (h - 1 >= 0 && mapNow[h - 1][w - 1] == "#") // top left
                        occupiedSeats++;
                    if (h + 1 < mapHeight && mapNow[h + 1][w - 1] == "#") // bottom left
                        occupiedSeats++;
                    if (mapNow[h][w - 1] == "#") // left
                        occupiedSeats++;
                }
                if (w + 1 < mapWidth) { // right
                    if (h - 1 >= 0 && mapNow[h - 1][w + 1] == "#") // top right
                        occupiedSeats++;
                    if (h + 1 < mapHeight && mapNow[h + 1][w + 1] == "#") // bottom right
                        occupiedSeats++;
                    if (mapNow[h][w + 1] == "#") // right
                        occupiedSeats++;
                }
                if (h - 1 >= 0 && mapNow[h - 1][w] == "#") // top
                    occupiedSeats++;
                if (h + 1 < mapHeight && mapNow[h + 1][w] == "#") // top
                    occupiedSeats++;

                if (mapNow[h][w] == "L") {
                    if (occupiedSeats == 0)
                        mapNewSim[h].push("#");
                    else
                        mapNewSim[h].push("L");
                } else if (mapNow[h][w] == "#") {
                    if (occupiedSeats >= 4)
                        mapNewSim[h].push("L");
                    else
                        mapNewSim[h].push("#");
                }


            }
        }
    }
}

let prevOcc = 0;
let q = 0;
while(true) {
    console.log("🧮 Simulation for round ",(q+1));
    sim();
    let occ = 0;
    for (let j = 0; j < mapHeight; j++) {
        let o = "";
        for (let i = 0; i < mapWidth; i++){
            o += mapNewSim[j][i];
            if (mapNewSim[j][i] == "#")
                occ++;
        }
        //console.log(o);
    }
    console.log("🪑 Occupied seats:",occ);
    if (prevOcc == occ){
        console.log("🌟 Occupied seats stablized at",occ,"after",(q+1),"rounds.");
        break;
    }
    prevOcc = occ;
    mapNow = mapNewSim;
    q++;
}