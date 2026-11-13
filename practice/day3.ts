//Topic 1: class, constructor, this and methods
class Employee {
  name: string;
  team: string;

  constructor(name: string, team: string) {   // runs automatically on "new"
    this.name = name;                          // save the name inside this object
    this.team = team;                          // save the team inside this object
  }
}

const e1 = new Employee('Suraj', 'QA');       // created AND set up in one line
const e2 = new Employee('Ravi', 'Dev');

// new Employee('Amit');   // ❌ TypeScript error: you must give a team too
console.log(e1.name, e1.team);                // Suraj QA

//Topic 2: inheritance, super and overriding
class Employee2 {
  constructor(public name: string, public team: string) {}

  introduce(): string {
    return `Hi, I'm ${this.name} from ${this.team}`;
  }

  workHours(): number {
    return 8;
  }
}

class Manager extends Employee2 {           // extends = Manager gets EVERYTHING Employee has
  constructor(name: string, team: string, public teamSize: number) {
    super(name, team);                     // super(...) = run the Employee constructor first
  }

  override introduce(): string {           // override = replace the parent's version
    const basic = super.introduce();       // super.introduce() = call the Employee version
    return `${basic}, and I manage ${this.teamSize} people`;
  }
}

const suraj = new Manager('Suraj', 'QA', 12);
console.log(suraj.introduce());   // Hi, I'm Suraj from QA, and I manage 12 people
console.log(suraj.workHours());   // 8  ← inherited, never written in Manager

