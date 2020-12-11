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
                let wDiff, hDiff;

                // left
                wDiff = 1;
                while ((w - wDiff) >= 0 && mapNow[h][w - wDiff] == ".")
                    wDiff++;
                if ((w - wDiff) >= 0)
                    if (mapNow[h][w - wDiff] == "#")
                        occupiedSeats++;

                // right
                wDiff = 1;
                while ((w + wDiff) < mapWidth && mapNow[h][w + wDiff] == ".")
                    wDiff++;

                if ((w + wDiff) < mapWidth)
                    if (mapNow[h][w + wDiff] == "#")
                        occupiedSeats++;

                // top
                hDiff = 1;
                while ((h - hDiff) >= 0 && mapNow[h - hDiff][w] == ".")
                    hDiff++;

                if ((h - hDiff) >= 0)
                    if (mapNow[h - hDiff][w] == "#")
                        occupiedSeats++;

                // bottom
                hDiff = 1;
                while ((h + hDiff) < mapHeight && mapNow[h + hDiff][w] == ".")
                    hDiff++;
                if ((h + hDiff) < mapHeight)
                    if (mapNow[h + hDiff][w] == "#")
                        occupiedSeats++;

                // left top
                wDiff = 1; hDiff = 1;
                while ((w - wDiff) >= 0 && (h - hDiff) >= 0 && mapNow[h - hDiff][w - wDiff] == ".") {
                    wDiff++; hDiff++;
                }
                if ((w - wDiff) >= 0 && (h - hDiff) >= 0 && mapNow[h - hDiff][w - wDiff] == "#")
                    occupiedSeats++;

                // right top
                wDiff = 1; hDiff = 1;
                while ((w + wDiff) < mapWidth && (h - hDiff) >= 0 && mapNow[h - hDiff][w + wDiff] == ".") {
                    wDiff++; hDiff++;
                }
                if ((w + wDiff) < mapWidth && (h - hDiff) >= 0 && mapNow[h - hDiff][w + wDiff] == "#")
                    occupiedSeats++;

                // left bottom
                wDiff = 1; hDiff = 1;
                while ((w - wDiff) >= 0 && (h + hDiff) < mapHeight && mapNow[h + hDiff][w - wDiff] == ".") {
                    wDiff++; hDiff++;
                }
                if ((w - wDiff) >= 0 && (h + hDiff) < mapHeight && mapNow[h + hDiff][w - wDiff] == "#")
                    occupiedSeats++;

                // right bottom
                wDiff = 1; hDiff = 1;
                while ((w + wDiff) < mapWidth && (h + hDiff) < mapHeight && mapNow[h + hDiff][w + wDiff] == ".") {
                    wDiff++; hDiff++;
                }
                if ((w + wDiff) < mapWidth && (h + hDiff) < mapHeight && mapNow[h + hDiff][w + wDiff] == "#")
                    occupiedSeats++;



                if (mapNow[h][w] == "L") {
                    if (occupiedSeats == 0)
                        mapNewSim[h].push("#");
                    else
                        mapNewSim[h].push("L");
                } else if (mapNow[h][w] == "#") {
                    if (occupiedSeats >= 5)
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
while (true) {
    console.log("🧮 Simulation for round ", (q + 1));
    sim();
    let occ = 0;
    for (let j = 0; j < mapHeight; j++) {
        let o = "";
        for (let i = 0; i < mapWidth; i++) {
            o += mapNewSim[j][i];
            if (mapNewSim[j][i] == "#")
                occ++;
        }
        //console.log(o);
    }
    console.log("🪑 Occupied seats:", occ);
    if (prevOcc == occ) {
        console.log("🌟 Occupied seats stablized at", occ, "after", (q + 1), "rounds.");
        break;
    }
    prevOcc = occ;
    mapNow = mapNewSim;
    q++;
}