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
    let validEyeColor = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
    const hairColorRegex = /#[0-9a-f]{6}/gm;
    const heightRegex = /([0-9]*)(cm|in)/gm;
    reqFields.forEach((f) => {
        if (f in p) {
            let isValid = false;
            switch (f) {
                case "byr":
                    let valByr = Number.parseInt(p[f]);
                    if (valByr >= 1920 && valByr <= 2002)
                        isValid = true;
                    break;
                case "iyr":
                    let valIyr = Number.parseInt(p[f]);
                    if (valIyr >= 2010 && valIyr <= 2020)
                        isValid = true;
                    break;
                case "eyr":
                    let valeyr = Number.parseInt(p[f]);
                    if (valeyr >= 2020 && valeyr <= 2030)
                        isValid = true;
                    break;
                case "hgt":
                    let m;
                    if ((m = heightRegex.exec(p[f])) !== null){
                        let hi = 0;
                        let un = "";
                        m.forEach((ma, idx)=>{
                            if (idx === 1)
                                hi = ma;
                            if (idx === 2)
                                un = ma;
                        });
                        if (un === "cm")
                            if (hi >= 150 && hi <= 193)
                                isValid = true;
                        if (un === "in")
                            if (hi >= 59 && hi <= 76)
                                isValid = true;
                    }
                    //isValid = true;
                    break;
                case "hcl":
                    if (hairColorRegex.exec(p[f]) !== null)
                        isValid = true;
                    break;
                case "ecl":
                    validEyeColor.forEach((c)=>{
                        if (p[f] === c)
                            isValid = true;
                    });
                        
                    break;
                case "pid":
                    if (p[f].length === 9)
                        isValid = true;
                    break;
                case "cid":
                    isValid = true;
                    break;
                default:
                    break;
            }

            if (isValid)
                validProperties++;
            else {
                console.log("👎 Property "+ f +" ( " +p[f]+ " ) invalid! :-(");
            }
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
