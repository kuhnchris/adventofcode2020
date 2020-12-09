import { group } from 'console';
import * as fs from 'fs';
import { isNonNullChain } from 'typescript';
import { inspect } from 'util';

var inpstr = fs.readFileSync("input.txt", { encoding: 'utf-8' })
var preambleLength = 25;
var inp: string[] = [];

inp = inpstr.replace(/\r/g, '').split("\n");
var cntCrypto = [];
var allCrypto = [];

function isValidNumber(inNmbr) {
    for (let i = 0; i < cntCrypto.length; i++)
        for (let j = i; j < cntCrypto.length; j++)
            if ((cntCrypto[i] + cntCrypto[j]) === inNmbr) {
                console.log("👍 ", inNmbr, "is as sum of 2 numbers in the last ", preambleLength, "numbers.");
                return true;
            } else {
                //console.log(i+j,"!=",inNmbr);
            }
    return false;
}

var filledPreamble = 0;
var BreakException = {};
inp.forEach(ee => {
    let e = parseInt(ee);
    if (filledPreamble < preambleLength) {
        filledPreamble++;
        cntCrypto.push(e);
        allCrypto.push(e);
        console.log("👍 added", e, "as ", (filledPreamble), " preamble/preload");

    } else {
        if (isValidNumber(e)) {
        } else {
            console.log("❌ number", e, "does not follow the rules and breaches protocol!!!");
            let lowest = Number.MAX_VALUE;
            let highest = Number.MIN_VALUE;
            let cSum = 0;
            let oOut = "0";
            for (let a = 0; a < allCrypto.length; a++) {
                cSum = 0;
                oOut = cSum.toString();
                let smol = Number.MAX_VALUE;
                let beeg = Number.MIN_VALUE;
                //console.log("📶",a,cSum);
                for (let b = a; b < allCrypto.length; b++) {
                    if (allCrypto[b] > beeg)
                        beeg = allCrypto[b];
                    if (allCrypto[b] < smol)
                        smol = allCrypto[b];

                    cSum += allCrypto[b];
                    oOut += " + " + allCrypto[b];
                    //console.log("📶",a,b,cSum);
                    if (cSum > e) {

                        //oOut += " > " + e;
                        oOut = "";
                        //console.log("⚡ ", cSum, "+", allCrypto[b], ">", e);
                        break;
                    }
                    else if (cSum == e) {
                        oOut += " == " + e;

                        if (smol <= lowest && beeg >= highest) {

                            lowest = smol;
                            highest = beeg;
                            console.log("🧩 idx rng:",a,"-",b,", low:", lowest, ", high:", highest);
                            break;
                        }
                    }
                }
                /*
                if (cSum == e) {
                    oOut += " == " + e;
                    if (allCrypto[a] <= lowest) {

                        lowest = allCrypto[a];
                        highest = allCrypto[allCrypto.length - 1];
                        console.log("🧩 ", lowest, " & ", highest);
                    }
                }*/
                if (oOut !== "")
                    console.log(oOut);
            }

            console.log("💎 ", lowest, "+", highest, "=", (lowest + highest));
            throw BreakException;
        }
        cntCrypto.push(e);
        allCrypto.push(e);
        if (cntCrypto.length > preambleLength)
            cntCrypto = cntCrypto.slice(1);

    }

});