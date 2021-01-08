
class People {
  var name: String
  var color: String

  init(name: String, color: String){
    self.name = name
    self.color = color
  }

  func say(){
    print("\(self.name) is a \(self.color) people.")
  }
}


class ChinesePeople: People{
  init(name: String){
    super.init(name: name, color: "yellow")
  }

  override func say(){
    print("\(self.name)是个黄种人。")
  }
}

let p = ChinesePeople(name: "阿Q")
p.say()


class NamedShape {
    var numberOfSides: Int = 0
    var name: String

    init(name: String) {
       self.name = name
    }

    func simpleDescription() -> String {
       return "A shape with \(numberOfSides) sides."
    }
}

class Square: NamedShape {
    var sideLength: Double

    init(sideLength: Double, name: String) {
        self.sideLength = sideLength
        super.init(name: name)
        numberOfSides = 4
    }

    func area() -> Double {
        return sideLength * sideLength
    }

    override func simpleDescription() -> String {
        return "A square with sides of length \(sideLength)."
    }
}
let test = Square(sideLength: 5.2, name: "my test square")
test.area()
test.simpleDescription()