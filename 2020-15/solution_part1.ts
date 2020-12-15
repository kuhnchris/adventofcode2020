import * as fs from 'fs';
import { inspect } from 'util';

var inpstr = fs.readFileSync("input.txt", { encoding: 'utf-8' })
var inp: string[] = [];

inp = inpstr.replace(/\r/g, '').split("\n");

let startNumbs = inp[0].split(",");
let turn = 1;
let turnTable = {};
while (turn < 2020){
    turn++;
    if ((turn-1) < startNumbs.length){
        turnTable[startNumbs[(turn-1)]] = turn;
    }
}
