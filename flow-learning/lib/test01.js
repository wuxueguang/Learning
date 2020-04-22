// function t(a: string, b: number,): string{
//     return a + b;
// }
// t('a', 2)
// function tt(a: 1|2|3): number{
//     return a;
// }
// tt(2);
// function T(){}
// function a(a: mixed){
//     return a;
// }
// a(1);
// function stringify(value: mixed) {
//     // $ExpectError
//     return Number(value) + 1; // Error!
//   }
//   stringify("foo");
//   function fn(obj: any) {
//     let foo: number = obj.foo;
//     return foo
//   }
//   fn({foo: 'ddd'})
//   console.log(fn({foo: 'ddd'}))
function f({
  n
}) {
  return n;
}

f({});