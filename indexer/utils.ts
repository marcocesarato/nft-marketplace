export function resolveIPFSLink(uri: string | null | undefined): string | null | undefined {
	return uri?.replace("ipfs://", "https://ipfs.io/ipfs/") || null;
}
