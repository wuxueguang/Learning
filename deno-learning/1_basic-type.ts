// Boolean
let isDone: boolean = false;
// Number
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
// String
let color: string = "blue";
// Array
let list: number[] = [1, 2, 3];
let list1: Array<number> = [1, 2, 3];
// Tuple 元组
let x: [string, number] = ["hello", 10];
// Enum
{
  enum Color {Red, Green, Blue}
  let c: Color = Color.Green;
}
{
  enum Color {Red = 1, Green, Blue}
  let c: Color = Color.Green;
}
{
  enum Color {Red = 1, Green, Blue}
  let colorName: string = Color[2];
}
// Any
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean
{
  let prettySure: Object = 4;
  prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'.
}
{
  let list: any[] = [1, true, "free"];
  list[1] = 100
}
// Void
function warnUser(): void {
  console.log("This is my warning message");
}
let unusable: void = undefined;
unusable = null; // OK if `--strictNullChecks` is not given
// Null and Undefined
// Not much else we can assign to these variables!
let u: undefined = undefined;
let n: null = null;
// Never
// Function returning never must have unreachable end point
function error(message: string): never {
  throw new Error(message);
}

// Inferred return type is never
function fail() {
  return error("Something failed");
}

// Function returning never must have unreachable end point
function infiniteLoop(): never {
  while (true) {
  }
}
// Object
declare function create(o: object | null): void;
create({ prop: 0 }); // OK
create(null); // OK
create(42); // Error
create("string"); // Error
create(false); // Error
create(undefined); // Error
// Type assertions  类型断言
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
{
  let someValue: any = "this is a string";
  let strLength: number = (someValue as string).length;
}