import * as fs from 'fs';
import { inspect } from 'util';
var inpstr = fs.readFileSync("input.txt", { encoding: 'utf-8' })
var inp: string[] = [];
inp = inpstr.replace(/\r/g, '').split("\n");

let readDone = false;
let lineCnt = 0;
let rules = {};
let myTicket = {};
let tickets = [];

const c_rules = "RULES";
const c_myticket = "MYTICKET";
const c_othertickets = "OTHERTICKETS";
let currentPhase = c_rules;
while (!readDone) {
    if (lineCnt >= inp.length)
        break;
    if (inp[lineCnt] != "") {
        let cLine = inp[lineCnt];
        if (currentPhase == c_rules) {
            let cRule = [];
            let cParse1 = cLine.split(":");
            let cParse2 = cParse1[1].split(" or ");
            cParse2.forEach((rng) => {
                let rngSplStr = rng.split("-");
                let rngSpl = [parseInt(rngSplStr[0]), parseInt(rngSplStr[1])];
                for (let i = rngSpl[0]; i <= rngSpl[1]; i++) {
                    cRule.push(i);
                }
            });
            console.log("added rule:", cParse1[0], cRule);
            rules[cParse1[0]] = cRule;
        } else if (currentPhase == c_myticket && cLine.indexOf(":") < 0) {
            myTicket = cLine.split(",");
            console.log("found my ticket:", myTicket);
        } else if (currentPhase == c_othertickets && cLine.indexOf(":") < 0) {
            let t = cLine.split(",");
            tickets.push(t);
            console.log("added a new ticket:",t);
        }
    } else {
        if (currentPhase == c_rules)
            currentPhase = c_myticket;
        else if (currentPhase == c_myticket)
            currentPhase = c_othertickets;
    }
    lineCnt++;
}

let TSR = 0;
tickets.forEach((t) => {
    let valFound = false;
    let invVals = [];
    t.forEach((vStr) => {
        let v = parseInt(vStr);
        //console.log("checking value ",v,"(",vStr,")");
        let thisValFound = false;
        Object.keys(rules).forEach((rKey) => {
            if (rules[rKey].indexOf(v) >= 0){
                //console.log("found value",v,"(",vStr,") in rule",rKey);
                valFound = true;
                thisValFound = true;
            }
        });
        if (!thisValFound) {
            invVals.push(v);
        }
    });
    if (invVals.length > 0){
        console.log("Ticket ",t,"contains invalid values:",invVals);
        invVals.forEach((val)=>{
            TSR+=val;
        });
    }
});
console.log("The (T)icket (S)canning error (R)ate is:",TSR);