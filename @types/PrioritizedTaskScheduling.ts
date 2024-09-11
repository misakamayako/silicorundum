interface SchedulerPostTaskOptions {
	signal?: AbortSignal;
	priority?: "low" | "medium" | "high"; // TaskPriority
	delay?: number; // unsigned long long
}

type SchedulerPostTaskCallback = () => void;

interface Scheduler {
	postTask<T>(
		callback: SchedulerPostTaskCallback,
		options?: SchedulerPostTaskOptions,
	): Promise<T>;

	yield(): Promise<undefined>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare const scheduler: Scheduler;
