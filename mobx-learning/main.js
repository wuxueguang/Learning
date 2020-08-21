import { observable, observe } from 'mobx';


const person = observable({
    firstName: "Maarten",
    lastName: "Luther"
});

const disposer = observe(person, change => {
  console.log(JSON.stringify(change, null, 4))
    console.log(change.type, change.name, "from", change.oldValue, "to", change.object[change.name]);
});

person.firstName =  "Martin";
// 输出: 'update firstName from Maarten to Martin'

disposer();
// 忽略任何未来的变化

// 观察单个字段
const disposer2 = observe(person, "lastName", (change) => {
    console.log("LastName changed to ", change.newValue);
});