export type Data = Record<string, any>;
export class DotEnv {
	public path: string | null | undefined;
	public ext: string | null | undefined;
	public env: Data | null | undefined;
	public envString: string | null | undefined;
	constructor(ext?: string, path?: string);
	public load(withEnv: boolean): DotEnv;
	public get(): Data;
	public find(): string | null;
	public save(changes: Data): DotEnv;
	private escapeRegExp(value: string): string;
}
export function dotenvLoad(ext?: string, path?: string): DotEnv;
