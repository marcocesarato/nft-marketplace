export function debounce(
	func: (args: IArguments) => any,
	wait: number,
	immediate: boolean = false,
) {
	let timeout: NodeJS.Timeout | undefined;

	return function executedFunction(this: any) {
		const context: any = this;
		const args = arguments;
		const later = () => {
			timeout = undefined;
			if (!immediate) {
				func.apply(context, [args]);
			}
		};
		const callNow: boolean = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) {
			func.apply(context, [args]);
		}
	};
}

export function throttle(fn: (args: any[]) => any, wait: number) {
	let shouldWait = false;
	return function () {
		if (!shouldWait) {
			fn([arguments]);
			shouldWait = true;
			setTimeout(() => (shouldWait = false), wait);
		}
	};
}

export function limitWords(string: string, words: number = 10) {
	return string.split(/\s+/, words).join(" ");
}
