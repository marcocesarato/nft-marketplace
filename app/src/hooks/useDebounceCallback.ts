export default function useDebounceCallback(func: Function | any, delay: number) {
	let timer;
	return function () {
		const self = this;
		const args = arguments;
		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(self, args);
		}, delay);
	};
}
