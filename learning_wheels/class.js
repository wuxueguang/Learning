class A{
  static color = 'yellow'
  constructor(){
    this.color = 'green'
  }
  test(){
    console.log(this.color, this.constructor.color)
  }
}

class B extends A{
  static color = 'black'
  constructor(){
    super();
    this.color = 'pink'
  }
  test(){
    console.log(this.color, this.constructor.color)
  }
}

(new B).test()