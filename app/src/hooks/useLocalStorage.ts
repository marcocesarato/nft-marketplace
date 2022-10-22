import {useEffect, useState} from "react";

function getStorageValue(key: string, defaultValue?: any) {
	// Getting stored value
	try {
		if (typeof window !== "undefined") {
			const saved = window.localStorage.getItem(key);
			const initial = saved != null ? JSON.parse(saved) : defaultValue;
			return initial;
		}
	} catch (e) {
		console.error(e);
		return defaultValue;
	}
}

export default function useLocalStorage<T>(
	key: string,
	defaultValue?: any,
): [T, (value: T) => void] {
	const [value, setValue] = useState<T>(() => {
		return getStorageValue(key, defaultValue);
	});

	useEffect(() => {
		// Storing input name
		window.localStorage.setItem(key, JSON.stringify(value || null));
	}, [key, value]);

	return [value, setValue];
}
