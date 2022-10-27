type ContractItem = {
	tokenId: string;
	creator: string;
	seller: string;
	owner: string;
	price: string | BigNumberish;
	sold: boolean;
};

type Item = {
	token_id: string;
	creator: string;
	seller: string;
	owner: string;
	price: string | BigNumberish;
	sold: boolean;
};

type ItemChanges = {
	seller?: string | null | undefined;
	owner?: string | null | undefined;
	price?: string | BigNumberish | null | undefined;
	sold?: boolean | null | undefined;
};

type ItemMetadata = {
	name: string;
	description: string;
	image: string;
	thumbnail?: string | null | undefined;
	external_url?: string | null | undefined;
	animation_url?: string | null | undefined;
	youtube_url?: string | null | undefined;
	attributes?: ItemAttribute[] | null | undefined;
};

type ItemAttribute = {
	trait_type: string;
	value: string;
	display_type?: string | null | undefined;
};

type ContractAddresses = {
	MarketAddress: string;
};
