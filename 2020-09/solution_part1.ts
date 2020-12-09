import { group } from 'console';
import * as fs from 'fs';
import { isNonNullChain } from 'typescript';
import { inspect } from 'util';

var inpstr = fs.readFileSync("input.txt", { encoding: 'utf-8' })
var preambleLength = 25;
var inp: string[] = [];

inp = inpstr.replace(/\r/g, '').split("\n");
var cntCrypto = [];

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
inp.forEach(ee => {
    let e = parseInt(ee);
    if (filledPreamble < preambleLength) {
        filledPreamble++;
        cntCrypto.push(e);
        console.log("👍 added", e, "as ", (filledPreamble), " preamble/preload");

    } else {
        if (isValidNumber(e)) {
        } else {
            console.log("❌ number", e, "does not follow the rules and breaches protocol!!!");

        }
        cntCrypto.push(e);
        if (cntCrypto.length > preambleLength)
            cntCrypto = cntCrypto.slice(1);

    }

});