export type Data = Record<string, any>;
export class DotEnv {
	private path: string | null | undefined;
	private ext: string | null | undefined;
	public env: Data | null | undefined;
	private envString: string | null | undefined;
	constructor(ext?: string, path?: string);
	public load(): void;
	public get(): Data;
	public find(): string | null;
	public save(changes: Data): void;
	private escapeRegExp(value: string): string;
}
export function dotenvLoad(ext?: string, path?: string): DotEnv;
