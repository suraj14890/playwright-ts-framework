//Program 1: reverse a string without .reverse()
const str = 'playwright';
//1st way
let reversed = '';                 // start with an empty string
for (const ch of str) {            // for...of works on strings directly — no need for [...str]
  reversed = ch + reversed;        // put the NEW character in FRONT
   // console.log(reversed);
}
console.log(reversed);             // thgirwyalp

//2nd way
let reversed2 = "";
for (let i = str.length -1; i>=0; i--){
    reversed2 += str[i];
}
console.log(reversed2);


//3rd way
const reversed3 = [...str].reduce((a,b)=>b + a ,"");
console.log(reversed3);


// Program 2: remove duplicates from an array
const arr = [1,2,2,3,3,3];
const unique = [...new Set(arr)];
console.log(unique);


//Program 3: count each character in a string
const str2 = 'automation';
const counts = {};                  // an empty "notebook" for tallies

for (const ch of str2) {             // look at each letter, one by one
  if (counts[ch]) {                 // have we seen this letter before?
    counts[ch] = counts[ch] + 1;    //   yes → add 1 to its tally
  } else {
    counts[ch] = 1;                 //   no  → start its tally at 1
  }
}

console.log(counts);   // { a: 2, u: 1, t: 2, o: 2, m: 1, i: 1, n: 1 }