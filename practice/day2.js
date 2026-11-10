//Asynchronous

console.log('1. Order food');

 setTimeout(() => {                // setTimeout: run this code LATER
  console.log('2. Food arrives');     //   after 2000 milliseconds = 2 seconds
 },2000);

 //Alternative set timeout
function foodArrives() {              // a normal function with a name
  console.log('2. Food arrives');
}
setTimeout(foodArrives, 2000);        // "run foodArrives after 2 seconds"

console.log('3. Watch TV while waiting');

//Promises

const orderFood = new Promise((resolve,reject) => {
    const kitchenOpen = true;
    setTimeout(() => { 
        if(kitchenOpen){
            resolve('Pizza is here');
        }
        else{
            reject('Kitchen is closed');
        }
    },2000);
    }
);
console.log('Order Placed, Waiting');

orderFood
    .then(result => console.log(result))
    .catch(error => console.log(error));


//Topic 3: async/await

const orderFood2 = new Promise((resolve,reject) => {
    const kitchenOpen = true;
    setTimeout(() => { 
        if(kitchenOpen){
            resolve('Pizza is here');
        }
        else{
            reject('Kitchen is closed');
        }
    },2000);
    }
);

async function dinner() {                    // async: this function contains waiting steps
  try {
    console.log('Order placed, waiting...');
    const food = await orderFood2;            // await: PAUSE here until the promise finishes
    console.log(food);                       // runs only after the food arrives
    console.log('Eating now');
  } catch (error) {                          // runs if the promise was rejected
    console.log('Problem:', error);
  } finally {                                // ALWAYS runs, success or failure
    console.log('Pay the bill');
  }
}

dinner();                                    // call the function to start it