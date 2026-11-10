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


//Program 4: names of users older than 30
const users = [
  { name: 'Asha', age: 25 },
  { name: 'Ravi', age: 35 },
  { name: 'Meera', age: 40 },
  { name: 'Karan', age: 30 },
];
//1st Way 
const names = [];                    // empty list for the result

for (const user of users) {          // look at each user object
  if (user.age > 30) {               // older than 30?
    names.push(user.name);           //   yes → add just their name
  }
}
console.log(names);                  // [ 'Ravi', 'Meera' ]

//2nd way 
const names2 = users
  .filter(user => user.age > 30)     // step 1: keep only users older than 30 → [Ravi obj, Meera obj]
  .map(user => user.name);           // step 2: turn each user object into just its name → ['Ravi', 'Meera']

console.log(names2);                 // [ 'Ravi', 'Meera' ]


// Find the second-largest number in an array.

//Way 1: remove duplicates, sort, pick the second (easiest)
const nums = [10, 40, 25, 40, 30];

const unique2 = [...new Set(nums)];          // remove duplicates → [10, 40, 25, 30]
unique2.sort((a, b) => b - a);               // sort LARGEST first → [40, 30, 25, 10]
console.log(unique2[1]);                     // second item → 30

//Way 2: one loop, keep track of the top two (the “efficient” answer)
let largest = -Infinity;    // smaller than any number, so the first real number always wins
let second = -Infinity;

for (const n of nums) {
  if (n > largest) {        // found a new biggest
    second = largest;       //   the old biggest moves down to second place
    largest = n;            //   n becomes the new biggest
  } else if (n > second && n !== largest) {   // bigger than second, but not equal to largest
    second = n;             //   n becomes the new second
  }
}
console.log(second);        // 30


//6. Check whether a string is a palindrome.
//Way 1: reverse it and compare (reuses your Program 1)
function isPalindrome(str) {
  let reversed = '';
  for (const ch of str) {
    reversed = ch + reversed;     // same trick as Program 1: put each letter in front
  }
  return str === reversed;        // same forwards and backwards?
}
console.log(isPalindrome('madam'));   // true
console.log(isPalindrome('test'));    // false

//Way 2: compare from both ends (the “efficient” answer)
function isPalindrome2(str) {
  let left = 0;                       // start at the first letter
  let right = str.length - 1;         // start at the last letter

  while (left < right) {              // walk towards the middle
    if (str[left] !== str[right]) {   // letters don't match?
      return false;                   //   not a palindrome — stop early
    }
    left++;                           // move one step right
    right--;                          // move one step left
  }
  return true;                        // every pair matched
}

//Bonus : Is 'Madam' a palindrome? What about 'A man a plan a canal Panama'?
function isPalindromeClean(str) {
  const clean = str.toLowerCase().replaceAll(' ', '');
  return clean === [...clean].reverse().join('');
}

console.log(isPalindromeClean('Madam'));                          // true
console.log(isPalindromeClean('A man a plan a canal Panama'));    // true