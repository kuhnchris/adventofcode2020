import { group } from 'console';
import * as fs from 'fs';
import { inspect } from 'util';

var inpstr = fs.readFileSync("input.txt", { encoding: 'utf-8' })
var inp: string[] = [];

inp = inpstr.replace(/\r/g, '').replace(/\n\n/g, '#').replace(/\n/g, '').split("#");
console.log("groups:", inp.length);

function removeDuplicateCharacters(string) {
    return string
        .split('')
        .filter(function (item, pos, self) {
            return self.indexOf(item) == pos;
        })
        .join('');
}

let groupCount = 0;
inp.forEach((g) => {
    groupCount += removeDuplicateCharacters(g).length;
})

console.log(groupCount);