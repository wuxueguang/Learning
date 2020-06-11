type PersonInfo = {
  gender: string,
  age: number,
};

class Person{
  private gender: string = 'male'
  protected age: number = 1
  constructor({gender, age}: PersonInfo){
    this.gender = gender;
    this.age = age;
  }
  speak(): void{
    console.log('I can speak!');
  }
}

type FatherInfo = {
  gender: string,
  age: number,
  name: string
};

class Father extends Person{
  public readonly hobby: string = 'kongfu'
  name: string = 'Nobody'
  constructor({gender, age, name}: FatherInfo) {
    super({gender, age});
    this.name = name;
  }
  introduce(): void{
    console.log(`My name is ${this.name}. I'm ${this.age} years old.`);
  }
}

const myFather = new Father({gender: 'male', age: 56, name: 'Wu'});

class Employeee {
  private _fullName: string
  get fullName(): string {
    return this._fullName;
  }

  set fullName(name: string) {
    this._fullName = name;
  }
}

myFather.speak();
myFather.introduce();
console.log(myFather.name);


