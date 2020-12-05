import * as fs from 'fs';
import { inspect } from 'util';

var inpstr = fs.readFileSync("input.txt", { encoding: 'utf-8' })
var inp: string[] = [];
inp = inpstr.split("\r\n");


function determ(low, high, inpStr, lowWord,highWord){
    let baseRow = {
        low: low,
        high: high
    };
    let rowId = inpStr;
    let mySeatRow = 0;
    for(let i = 0; i < rowId.length; i++){
        let num = Math.ceil((baseRow.high-baseRow.low) / 2);
        //console.log(i,rowId[i],num,baseRow.high,baseRow.low);
        if (rowId[i] === highWord)
        {
            baseRow.high -= num;
        } else if (rowId[i] === lowWord){
            baseRow.low += num;
        }
    }
    if (rowId[rowId.length-1] === highWord)
        mySeatRow = baseRow.low;
    else
        mySeatRow = baseRow.high;
    
    return mySeatRow;

}


let usedIDs = [];
let availIDs = [];

for(let i = 0; i < 128; i++)
    for(let j = 0; j < 8; j++)
        availIDs.push(i*8+j);

inp.forEach((pass)=>{
    //console.log(pass);
    let mySeatRow = determ(0,127,pass.slice(0,7),"B","F");
    //console.log("My Row:",mySeatRow);
    let myPlace = determ(0,7,pass.slice(7,10),"R","L");
    //console.log("My Place:",myPlace);
    let myId = mySeatRow*8+myPlace;
    usedIDs.push(myId);

})


availIDs.forEach((i)=>{
    let found = false;
    let found2 = false;
    let found3 = false;
    for(let j = 0;j<usedIDs.length;j++){
        if (usedIDs[j]===i-1) // before my seat
            found2 = true;
        if (usedIDs[j]===i) // my seat (potentially)
            found = true;
        if (usedIDs[j]===i+1) // after my seat
            found3 = true;
    }
    if (!found && found2 && found3)
        console.log("My Seat could be... ",i);
})
