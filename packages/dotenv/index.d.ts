export type Data = Record<string, any>;
export class DotEnv {
	private path: string;
	private env: Data;
	private envString: string;
	constructor(rootPath: string, autoLoad: boolean);
	public load(): void;
	public get(): Data;
	public find(): string | null;
	public save(changes: Data): void;
	private escapeRegExp(value: string): string;
}
export function dotenvLoad(rootPath: string, autoLoad: boolean): DotEnv;
