export default class Events {
	constructor() {
		this.listeners = [];
	}

	attach(listener) {
		this.listeners.push(listener);
	}

	notify(arg1, arg2) {
		this.listeners.forEach((listener, index) => {
			this.listeners[index](arg1, arg2);
		});
	}
}
