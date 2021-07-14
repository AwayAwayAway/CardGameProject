function Events() {
	this.listeners = [];

	this.attach = function(listener) {
		this.listeners.push(listener);
	}

	this.notify = function(arg1, arg2) {
		this.listeners.forEach((listener, index) => {
			this.listeners[index](arg1, arg2)
		})
	}
}