export function getPath(uri: string | null | undefined): string {
	return uri?.split("?")[0].split("#")[0] || "";
}
export function getEmbeddedIPFSImageUrl(uri: string | null | undefined): string {
	const basePath = `/api/ipfs?cid=`;
	const query = encodeURIComponent(uri);
	return basePath + query;
}
