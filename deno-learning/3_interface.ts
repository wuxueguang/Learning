{
  const printLabel = function(labeledObj: { label: string }) {
    console.log(labeledObj.label);
  }
  
  let myObj = {size: 10, label: "Size 10 Object"};
  printLabel(myObj);
}
{
  interface LabeledValue {
    label: string;
  }
  const printLabel = function(labeledObj: LabeledValue) {
      console.log(labeledObj.label);
  }
  let myObj = {size: 10, label: "Size 10 Object"};
  printLabel(myObj);
}

// Function Type
interface SearchFunc {
  (source: string, subString: string): boolean;
}
let mySearch: SearchFunc = function(source: string, subString: string) {
    let result = source.search(subString);
    return result > -1;
}
// Indexable Types
interface StringArray {
  [index: number]: string;
}
let myArray: StringArray = ["Bob", "Fred"];
let myStr: string = myArray[0];
let ats: StringArray = {1: 'a', '2': 'b'};
// Class Types
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date): void;
}
class Clock implements ClockInterface {
  currentTime: Date = new Date();
  setTime(d: Date) {
      this.currentTime = d;
  }
  constructor(h: number, m: number) { }
}
// Extending Interfaces
{
  interface Shape {
    color: string;
  }
  interface Square extends Shape {
    sideLength: number;
  }
  let square = {} as Square;
  square.color = "blue";
  square.sideLength = 10;
}
{
  interface Shape {
    color: string;
  }
  interface PenStroke {
      penWidth: number;
  }
  interface Square extends Shape, PenStroke {
      sideLength: number;
  }
  let square = {} as Square;
  square.color = "blue";
  square.sideLength = 10;
  square.penWidth = 5.0;
}
// Hybrid Types
{
  interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
  }
  function getCounter(): Counter {
      let counter = (function (start: number) { }) as Counter;
      counter.interval = 123;
      counter.reset = function () { };
      return counter;
  }
  let c = getCounter();
  c(10);
  c.reset();
  c.interval = 5.0;
}
// Interfaces Extending Classes
{
  class Control {
    private state: any;
  }
  interface SelectableControl extends Control {
    select(): void;
  }
  class Button extends Control implements SelectableControl {
    select() { }
  }
  class TextBox extends Control {
    select() { }
  }
  // Error: Property 'state' is missing in type 'Image'.
  class Image implements SelectableControl {
    private state: any;
    select() { }
  }
  class Location {
  
  }
}


