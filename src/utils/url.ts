export function getPath(uri: string | null | undefined): string {
	return uri?.split("?")[0].split("#")[0] || "";
}
