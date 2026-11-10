// A helper that makes a fake order: it finishes after 'ms' milliseconds
function order(item, ms, success = true) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      success ? resolve(`${item} ✅`) : reject(`${item} ❌ failed`);
    }, ms);
  });
}

async function run() {
  // 1. Promise.all — wait for ALL; if ANY fails, the whole thing fails
  const all = await Promise.all([order('Pizza', 2000), order('Drinks', 1000)]);
  console.log('all:', all);              // [ 'Pizza ✅', 'Drinks ✅' ] after 2 seconds (the slowest)

  // 2. Promise.allSettled — wait for ALL; NEVER fails, gives a report for each
  const settled = await Promise.allSettled([order('Pizza', 1000), order('Cake', 500, false)]);
  console.log('allSettled:', settled);
  // [ { status: 'fulfilled', value: 'Pizza ✅' }, { status: 'rejected', reason: 'Cake ❌ failed' } ]

  // 3. Promise.race — the FIRST one to finish wins
  const fastest = await Promise.race([order('Shop A', 3000), order('Shop B', 1000)]);
  console.log('race:', fastest);         // Shop B ✅
}

run();


//Topic 5: the event loop (a concept question; no coding needed)
console.log('A');                                // normal code → runs now
setTimeout(() => console.log('B'), 0);           // normal line (macrotask), even with 0 ms
Promise.resolve().then(() => console.log('C'));  // VIP line (microtask)
console.log('D');                                // normal code → runs now


//Output: A D C B