// 1. Basic types — the  : type  part is the only new thing
let testName: string = 'Login test';    // text
let retries: number = 2;                // number
let isPassed: boolean = true;           // true / false
let browsers: string[] = ['chromium', 'firefox'];   // array of strings

// 2. TypeScript catches mistakes — uncomment the next line and watch VS Code
// retries = 'two';    // ❌ red underline: Type 'string' is not assignable to type 'number'

// 3. Types on function inputs and output
function add(a: number, b: number): number {   // takes 2 numbers, returns a number
  return a + b;
}
console.log(add(2, 3));       // 5
// add('2', 3);               // ❌ red underline: '2' is a string, not a number

// 4. Custom type — only these exact values are allowed (a union type)
type Env = 'dev' | 'qa' | 'prod';
let currentEnv: Env = 'qa';
// currentEnv = 'staging';    // ❌ not in the list

console.log(testName, retries, isPassed, browsers, currentEnv);


//Topic 7: interfaces and enums

interface User {
  id: number;
  name: string;
  email?: string;          // ? = optional: can be left out
  readonly role: string;   // readonly = set once, can't be changed later
}

const u1: User = { id: 1, name: 'Suraj', role: 'QA Lead' };   // ✅ email skipped (optional)
console.log(u1);

// const u2: User = { id: 2, role: 'Dev' };   // ❌ missing 'name' — red underline
// u1.role = 'Manager';                      // ❌ role is readonly — red underline

interface LoginData {
  username: string;
  password: string;
}
const validUser: LoginData = { username: 'standard_user', password: 'secret_sauce' };

enum Status {
  Pass = 'PASS',
  Fail = 'FAIL',
  Skip = 'SKIP',
}

let result: Status = Status.Pass;
console.log(result);              // PASS

// result = 'PASSED';             // ❌ only Status.Pass / Fail / Skip are allowed


//Topic 8: generics and Promise return types (the last TypeScript topic)


// Without generics — you'd need one function per type
function firstNumber(items: number[]): number { return items[0]; }
function firstString(items: string[]): string { return items[0]; }

// With generics — ONE function for any type
function firstItem<T>(items: T[]): T {     // T = "whatever type you give me"
  return items[0];
}

console.log(firstItem<number>([10, 20]));          // 10        (T is number)
console.log(firstItem<string>(['qa', 'dev']));     // qa        (T is string)
console.log(firstItem(['chromium', 'firefox']));   // chromium  (TypeScript guesses T automatically)

///
interface User2 { id: number; name: string; }
interface Order { orderId: number; total: number; }

interface ApiResponse<T> {      // the wrapper is always the same...
  status: number;
  data: T;                      // ...only the data inside changes
}

const userRes: ApiResponse<User2> = { status: 200, data: { id: 1, name: 'Suraj' } };
const orderRes: ApiResponse<Order> = { status: 201, data: { orderId: 55, total: 499 } };

console.log(userRes.data.name);       // Suraj
console.log(orderRes.data.total);     // 499
// userRes.data.total                 // ❌ red underline — a User has no 'total'
////
async function getUser(id: number): Promise<User2> {   // will give back a User, later
  return { id, name: 'Suraj' };
}

async function clickLogin(): Promise<void> {          // void = gives back nothing
  console.log('clicked');
}

getUser(1).then(u => console.log(u.name));            // Suraj