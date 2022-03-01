import {useEffect, useState} from "react";

function getStorageValue(key, defaultValue) {
	// Getting stored value
	try {
		if (typeof window !== "undefined") {
			const saved = localStorage.getItem(key);
			const initial = saved !== null ? JSON.parse(saved) : defaultValue;
			return initial;
		}
	} catch (e) {
		console.error(e);
		return defaultValue;
	}
}

export default function useLocalStorage(key, defaultValue) {
	const [value, setValue] = useState(() => {
		return getStorageValue(key, defaultValue);
	});

	useEffect(() => {
		// Storing input name
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue];
}
