const {
	SyncHook,
	AsyncParallelHook,
} = require("tapable");

class List {
	getRoutes() {
		return 'routes';
	}
}

const warningLamp = {
	on: function () {
		//turn on the lamp ...
		console.log('Lamp is turned on.');
	}
};

class Car {
	constructor () {
		this.hooks = {
			accelerate: new SyncHook(["newSpeed"]),
			brake: new SyncHook(),
			calculateRoutes: new AsyncParallelHook(["source", "target", "routesList"])
		};
	}

	stop() {
		console.log('Car stopped!');
		this.hooks.brake.call();
	}
	setSpeed(newSpeed) {
		this.hooks.accelerate.call(newSpeed);
	}
	useNavigationSystemPromise(source, target) {
		const routesList = new List();
		return this.hooks.calculateRoutes.promise(source, target, routesList).then((res) => {
			console.log('-- end --');
			return routesList.getRoutes();
		});
	}
	useNavigationSystemAsync(source, target, callback) {
		const routesList = new List();
		this.hooks.calculateRoutes.callAsync(source, target, routesList, err => {
			if (err) return callback(err);
			callback(null, routesList.getRoutes());
		});
	}
}


const myCar = new Car();

myCar.hooks.brake.tap('WarningLampPlugin', () => warningLamp.on());

myCar.hooks.accelerate.tap('GetNewSpeedPlugin', newSpeed => console.log(newSpeed));

myCar.hooks.calculateRoutes.tap('Test', (source, target, routeList) => { console.log(source, target, routeList.getRoutes()) });
myCar.hooks.calculateRoutes.tap('Test', (source, target, routeList) => { console.log(source, target, routeList.getRoutes()) })

myCar.useNavigationSystemPromise('source', 'target');
