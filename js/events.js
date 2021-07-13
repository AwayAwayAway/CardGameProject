function Events() {
	this.listeners = [];

	this.attach = function(listener) {
		this.listeners.push(listener);
	}

	this.notify = function(args) {
		this.listeners.forEach((listener, index) => {
			this.listeners[index](args)
		})
	}
}