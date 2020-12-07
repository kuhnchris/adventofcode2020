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

let solveForBagType = function (bag, level=0) {
    let containAll = 0;
    level+=4;
    let levelSpace = " ".repeat(level);
    Object.keys(bagMap).forEach(bm => {
        if (bm === bag) {
            console.log(levelSpace,"👜 hey there bag '", bag, "', let's drill your contents");
            bagMap[bm].forEach((be) => {
                if (be.name !== bag) {
                    console.log(levelSpace,"💡 found '", be.name, "' in '", bm, "'... drilling down");
                    let dd = solveForBagType(be.name,level);
                    console.log(levelSpace,"➕",bm,"> adding... ", be.name, "=", dd, "(drill down) *",be.amount,"(amount)");
                    //containAll += be.amount + solveForBagType(bm);
                    containAll += be.amount + (be.amount * dd);
                    console.log(levelSpace,"👀", bag,"now contains ",containAll, "bags");
                } else {
                    containAll = 0;
                    console.log(levelSpace,"👀", bag, "now contains ",containAll, "bags");
                }
            })
        }
    });
    return containAll;
}

console.log(inspect(bagMap));
console.log("Bag contains... ",solveForBagType('shiny gold',-4)," other bags. holy moly.");