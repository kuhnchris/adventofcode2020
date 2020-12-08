import { group } from 'console';
import * as fs from 'fs';
import { inspect } from 'util';

var inpstr = fs.readFileSync("input.txt", { encoding: 'utf-8' })
var inp: string[] = [];

inp = inpstr.replace(/\r/g, '').split("\n");

let bagMap = {};
const bagEx = /(?:(?:(\d) )?([^.\n ]* [^ ]*){1} (?:bag)s?)/gim;
inp.forEach((bagRule) => {
    let bagBase = "";
    let bagContent = [];
    let bagExRes;
    while ((bagExRes = bagEx.exec(bagRule)) != null) {
        if (bagExRes != null) {
            if (bagBase === "")
                bagBase = bagExRes[2];
            else if (bagExRes[2] === "no other") {
                bagContent.push({ name: bagBase, amount: 1 });
            }
            else {
                bagContent.push({ name: bagExRes[2], amount: parseInt(bagExRes[1]) });
            }
            //console.log(bagExRes[1],bagExRes[2]);
        }
    }
    bagMap[bagBase] = bagContent;
});

let solvedColors = [];
let solveForBagType = function (bag) {
    let containAll = 0;
    solvedColors.push(bag);
    Object.keys(bagMap).forEach(bm => {
        if (bm === bag) {
            //console.log("👜 hey there bag '",bag,"'.");
        } else {
            //console.log("checking '",bm,"'...");
            bagMap[bm].forEach((be) => {
                if (be.name === bag) {
                    if (solvedColors.indexOf(bm) < 0) {
                        console.log("💡 found '", bag, "' in '", bm, "'... drilling down");
                        //containAll += be.amount + solveForBagType(bm);
                        containAll += 1 + solveForBagType(bm);
                    } else {
                        console.log("▫ already solved bag '", be.name, "'");
                    }
                }
            })
        }
    });
    console.log(bag,">returning: ",containAll);
    return containAll;
}

console.log(inspect(bagMap));
console.log(solveForBagType('shiny gold'));