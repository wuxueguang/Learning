const f = new Proxy(function(name){
	this.name = name;
}, {
	construct: function(target, args){
		const o = new target(...args);
		o.age = 13;
		return o;
    }
});

const o = new f('Tom');