

class Base{
  private static x = 'x'
  protected static y = 'y'
  protected m: string
  private n: number

  constructor(m: string, n: number){
    this.m = m;
    this.n = n;

    console.log(new.target.x);
  }

  say(): void{
    console.log(Base.x, this.n);
  }
}

class Derived1 extends Base{
  say(d?: Derived1): void{
    console.log(Derived1.y, Base.y);
    console.log(d.m);
  }
}

/* Base.y;
Derived1.y; */

const d = new Derived1('mmmmm', 4);

d.say();


class Box<Type>{
  contents: Type
  constructor(val: Type){
    this.contents = val;
  }
}


const b = new Box<string>('hello');


