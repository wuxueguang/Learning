// interface SquareConfig {
//   color?: string;
//   width?: number;
// }

import { fstat } from "fs";

// function createSquare(config: SquareConfig): {color: string; area: number} {
//   let newSquare = {color: "white", area: 100};
//   if (config.color) {
//     newSquare.color = config.color;
//   }
//   if (config.width) {
//     newSquare.area = config.width * config.width;
//   }
//   return newSquare;
// }

// let mySquare = createSquare({color: "black"});

// console.log(mySquare);

// const user = {
//   name: "Daniel",
//   age: 26,
// };

// user.location;
// import express from "express";
// const app = express();

// app.get("/", function (req, res) {
//   res
// });

// function greet(person, date) {
//   console.log(`Hello ${person}, today is ${date}!`);
// }

// greet("Brendan");

type funcWithProperties = {
  description: string,
  (someArgs: any): any,
};

type callableAndNewAble = {
  new (someArg: any): object,
  (someArg?: any): any,
}

function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
  return arr.map(func);
}
// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
const parsed = map(["1", "2", "3"], (n) => parseInt(n));




function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}
// longerArray is of type 'number[]'
const longerArray = longest([1, 2], [1, 2, 3]);
// longerString is of type 'string'
const longerString = longest("alice", "bob");
// Error! Numbers don't have a 'length' property
// const notOK = longest(10, 100);


function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
}
// const arr = combine([1, 2, 3], ["hello"]);
const arr = combine<string | number>([1, 2, 3], ["hello"]);

function firstElement1<Type>(arr: Type[]) {
  return arr[0];
}

function firstElement2<Type extends any[]>(arr: Type) {
  return arr[0];
}

function len(s: string): number;
function len(arr: any[]): number;
function len(x: any) {
  return x.length;
}

// function len(x: any[] | string) {
//   return x.length;
// }
type User = {
  name: string,
  admin: string,
}

interface DB {
  filterUsers(filter: (this: User) => boolean): User[];
}

// const db = getDB();
// const admins = db.filterUsers(function (this: User) {
//   return this.admin;
// });

// function f1(a: any) {
//   a.b(); // OK
//   a.toString();
// }
// function f2(a: unknown) {
//   a.say();
//   (<{say: () => {}}>a).say();
//   (a as {say: () => {}}).toString();
// }


const args = [8, 5] as [number, number];
const angle = Math.atan2(...args);

interface Person {
  name: string;
  age: number;
}

interface ReadonlyPerson {
  readonly name: string;
  readonly age: number;
}

let writablePerson: Person = {
  name: "Person McPersonface",
  age: 42,
};

// works
let readonlyPerson: ReadonlyPerson = writablePerson;

console.log(readonlyPerson.age); // prints '42'
writablePerson.age++;
console.log(readonlyPerson.age); // prints '43'

interface Box<Type> {
  contents: Type;
}
interface StringBox {
  contents: string;
}


interface Box<Type> {
  contents: Type;
}

let boxA: Box<string> = { contents: "hello" };
boxA.contents;
        
let boxB: StringBox = { contents: "world" };
boxB.contents;




type OrNull<Type> = Type | null;

type OneOrMany<Type> = Type | Type[];

type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>;
           
type OneOrManyOrNull<Type> = OneOrMany<Type> | null;

type OneOrManyOrNullStrings = OneOrManyOrNull<string>;

function identity<Type>(arg: Type): Type {
  return arg;
}
let output = identity<string>("myString");
let output1 = identity("myString");


/* function */
type Func0 = <Type>(arg: Type) => Type;
type Func1 = {<Type>(arg: Type): Type};

function call<Type>(cb: (arg: Type) => Type): Type{
}

interface GenericIdentityFn<Type> {
  (arg: Type): Type;
}
function identity1<Type>(arg: Type): Type {
  return arg;
}
let myIdentity: GenericIdentityFn<number> = identity1;

myIdentity(2);

/* type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;
type TT = {a: string, b: number};
type T = keyof TT;
const t2: T = 'b';
const t1: A = 3;

type F11 = (arg: number) => number;

const n: ReturnType<F11> = 123123;

function f() {
  return { x: 10, y: 3 };
} */
// type P = ReturnType<typeof f>;
    
/*
typeof f

*/
type fs = () => {x: number, y: number};
type Pp = ReturnValue<fs>;

/* 
type P = {
  x: number;
  y: number;
} 
*/

const MyArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 38 },
];

type Person = typeof MyArray[number];

type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};
type FeatureFlags = {
  darkMode: () => void;
  newUserProfile: () => void;
};
type FeatureOptions = OptionsFlags<FeatureFlags>;

/* type FeatureOptions = {
  darkMode: boolean;
  newUserProfile: boolean;
} */

type G = 'test';


let g: G = 'test';