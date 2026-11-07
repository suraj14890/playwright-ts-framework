// 1. Variables and dynamic typing
console.log('--------------TOPIC1------------------');
let x = 5;
console.log(typeof x);

x="Five";
console.log(typeof x);

const arr = [1];
arr.push(2);
console.log(arr);

console.log(typeof null);
console.log(1=='1',1==='1');


// 2. Array methods
console.log('--------------TOPIC2------------------');
const prices = [100, 250, 40, 500];

const withTax = prices.map(p => p * 1.18);
console.log('map:' , withTax)

const big = prices.filter(p => p > 100);
console.log('filter:', big);

const total = prices.reduce((sum,p) => sum + p,0);
console.log('reduce:', total);

const first = prices.find(p => p > 200);
console.log('find', first);

console.log('some:', prices.some(p => p < 50));
console.log('every:', prices.every(p => p > 0));

prices.forEach(p => console.log('item:',p));

const sorted = [...prices].sort((a,b) => a-b);
console.log('sorted:',sorted);
console.log('original:',prices);


console.log ('DoublePrice:', prices.map(p => p * 2));
console.log ('PriceBelow300', prices.filter(p=> p<300));
console.log ('HighestPrice:', prices.reduce((max,p) => Math.max(max,p),0));
console.log ('Highest',Math.max(...prices)); 
console.log ('LowestPrice:', prices.reduce((min,p)=>Math.min(min,p),prices[0]));
console.log('original:',prices);

// Topic 3: objects and loops (for...in vs for...of)
console.log('--------------TOPIC3------------------');
const user = {name:'suraj',role:'QA Lead', years: 11};
console.log(user.name);
console.log(user['role']);

for (const key in user) {
    console.log(key,'=' , user[key]);
}

const browsers = ['chromium', 'firefox', 'webkit'];
for (const b  of browsers){
    console.log(b);
}

for (const[key, value] of Object.entries(user)){
    console.log(key, value);
}


console.log(Object.keys(user));
console.log(Object.values(user));
console.log(Object.entries(user));


//Topic 4: object cloning

//Part A: why = is not a copy
const original = { name:'suraj', address: { city:'Gurugram' }};
const sameObj = original;
sameObj.name = 'Ravi';
console.log(original.name);

//Part B: shallow copy (outer level only)
const original2 = { name:'suraj', address: { city:'Gurugram' }};
const a = {...original2};
a.name = 'Amit';
console.log(original2.name);
a.address.city = 'Noida';
console.log(original2.address.city);

//Part C: deep copy (every level)
const original3 = { name:'suraj', address: { city:'Gurugram' }};
const c = structuredClone(original3);
c.address.city = 'Noida';
console.log(original3.address.city);



//Topic 5: ES6 (ECMAScript 2015) style : backticks and ${}
// Template literals — build text with backticks ` ` and ${ }
const myname = 'Suraj';
const mytests = 6;
console.log(`Hi ${myname}, ${mytests} tests passed`);