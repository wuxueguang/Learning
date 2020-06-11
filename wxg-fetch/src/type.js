const type = val => /^\[object (.+)\]$/.exec(Reflect.toString.call(val))[1].toLowerCase();

export default type;