let web3 = require("web3");
let BN = web3.utils.BN;
let fs = require('fs');
const { log } = require("console");
let obj = {};

let range = "10000";

for (let i = 1; i < 100000000; i++) {
    addToObj((new BN('67444517905571050173375938710252589416565298834411878054377806149391942411614')).div((new BN(range)).mul(new BN(i))).mod(new BN(range)).addn(1).toString());
}


fs.writeFileSync("result.json",JSON.stringify(obj,null,4));
// let obj = JSON.parse(fs.readFileSync("result.json").toString());

let arr = Object.keys(obj).map(v=>+obj[v]);
let min = Math.min(...arr);
let max = Math.max(...arr);
let decimals = 1000000;
let average = arr.reduce((prev,curr)=>prev.add(new BN(curr)),new BN(0)).muln(decimals).divn(arr.length);
let averageHole = average.divn(decimals).toString();
let averageNotHole = average.modn(decimals).toString();
log(min);
log(max);
log(averageHole+"."+averageNotHole);
// // console.log(obj);

function addToObj(key) {
    if (!obj[key]) {
        obj[key] = 1;
    } else {
        obj[key]++;
    }
}

