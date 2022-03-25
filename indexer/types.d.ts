type Item = {
	tokenId: string;
	creator: string;
	seller: string;
	owner: string;
	price: string;
	sold: boolean;
};

type ItemChanges = {
	seller?: string | null | undefined;
	owner?: string | null | undefined;
	price?: string | null | undefined;
	sold?: boolean | null | undefined;
};

type ItemMetadata = {
	name: string;
	description: string;
	image: string;
	externalUrl?: string | null | undefined;
	attributes?: ItemAttribute[] | null | undefined;
};

type ItemAttribute = {
	trait_type: string;
	value: string;
	display_type?: string | null | undefined;
};

type ItemAttributeMapped = {
	traitType: string;
	value: string;
	displayType?: string | null | undefined;
};
