import * as fs from 'fs';
import { inspect } from 'util';

var inpstr = fs.readFileSync("input.txt", { encoding: 'utf-8' })
var inp: string[] = [];
inp = inpstr.split("\r\n");

var reqFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid", "cid"];

let i = 0;
let passports = [];
let curr_passport = {};
while (i < inp.length) {

    if (inp[i] === "") {
        passports.push(curr_passport);
        curr_passport = {};
    } else {
        let passInp = inp[i].split(" ");
        passInp.forEach((passFieldValue) => {
            let splitPassFieldValue = passFieldValue.split(":");
            curr_passport[splitPassFieldValue[0]] = splitPassFieldValue[1];
        });
    }
    i++;
}

if (curr_passport !== {}) {
    passports.push(curr_passport);
}

//console.log(inspect(passports));
/*passports.forEach((p)=>{
    let strOut = "{ ";
    Object.keys(p).forEach((pp)=>{
        strOut += pp+":"+p[pp]+" ";
    });
    strOut += "}";
    console.log(strOut);
})*/
console.log("found " + passports.length + " passports, checking validity...");

let validPassports = 0;
passports.forEach((p) => {
    let strOut = "{ ";
    Object.keys(p).forEach((pp) => {
        strOut += pp + ":" + p[pp] + " ";
    });
    strOut += "}";

    let validProperties = 0;
    let foundCid = false;
    reqFields.forEach((f) => {
        if (f in p) {
            validProperties++;
        }

        else if (f === "cid") {
            //console.log("cid is missing!");
            foundCid = true;
        }
    });
    if (validProperties === reqFields.length) {
        console.log("👍  valid  passport (" + validProperties + " valid properties): " + strOut);
        validPassports++;
    }
    else if ((validProperties + 1) === reqFields.length && foundCid) {
        console.log("✅ 'valid' passport (" + validProperties + " valid properties): " + strOut);
        validPassports++;
    }
    else {
        console.log("❌ invalid passport (" + validProperties + " valid properties): " + strOut);
    }
});

console.log("there are " + validPassports + " valid passports in the system");
