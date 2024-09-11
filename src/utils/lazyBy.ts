class LazyBy<T> {
	private readonly task: () => Promise<T>;
	private result: T | undefined;
	private promise: Promise<T> | undefined;
	private initialized = false;

	constructor(task: () => Promise<T>) {
		this.task = task;
	}

	async get(): Promise<T> {
		if (!this.initialized) {
			if (this.promise === undefined) {
				this.promise = scheduler.postTask(async () => {
					this.result = await this.task();
					this.initialized = true;
					return this.result;
				});
			}
			return this.promise;
		}
		if (this.result === undefined) {
			throw new Error("Lazy value was not initialized properly");
		}
		return this.result;
	}
}

export default LazyBy;
