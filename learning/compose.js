function compose(...funcs) {
    if (funcs.length === 0) {
      return arg => arg
    }
  
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}