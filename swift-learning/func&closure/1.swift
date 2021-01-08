// func greet(person: String, day: String) -> String {
//   return "Hello \(person), today is \(day)."
// }
// print(greet(person: "Bob", day: "Tuesday"))


// func greet(_ person: String, on day: String) -> String {
//   return "Hello \(person), today is \(day)."
// }
// print(greet("John", on: "Wednesday"))



// var str: String = "string demo \(1)"
// print(str)

// let str = ""
// print(str.isEmpty)

// stringA 可被修改
// var stringA = "菜鸟教程："
// stringA += "http://www.runoob.com"
// print( stringA )

// stringB 不能修改
var stringB = String("菜鸟教程：")
stringB += "http://www.runoob.com"
print( stringB.unicodeScalars )