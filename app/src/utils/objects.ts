import {GenericObject} from "@app/types";

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item: any): boolean {
	return item && typeof item === "object" && !Array.isArray(item);
}

/**
 * Is string check.
 */
export function isString(x: any): boolean {
	return Object.prototype.toString.call(x) === "[object String]";
}

/**
 * Deep merge two objects.
 * @param target
 * @param sources
 */
export function deepMerge(target: GenericObject, ...sources: GenericObject[]): GenericObject {
	target ??= {};

	if (!sources.length) return target;
	const source = sources.shift();

	if (isObject(target) && isObject(source)) {
		for (const key in source) {
			if (isObject(source[key])) {
				if (!target[key]) Object.assign(target, {[key]: {}});
				deepMerge(target[key], source[key]);
			} else {
				Object.assign(target, {[key]: source[key]});
			}
		}
	}

	return deepMerge(target, ...sources);
}

/**
 * Clean empty object.
 * @param obj
 * @returns object
 */
export function cleanObject(obj: GenericObject): GenericObject {
	for (const k in obj) {
		if (obj[k] == null || obj[k] === "" || Object.keys(obj[k]).length === 0) {
			delete obj[k];
		}
	}
	return obj;
}
