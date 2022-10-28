type ContractItem = {
	tokenId: string;
	creator: string;
	seller: string;
	owner: string;
	price: string | BigNumberish;
	sold: boolean;
};

type Item = {
	network_id: number;
	token_address?: string;
	token_id: string;
	creator: string;
	seller: string;
	owner_of: string;
	price: string | BigNumberish;
	sold: boolean;
};

type ItemChanges = {
	seller?: string | null | undefined;
	owner_of?: string | null | undefined;
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
	attributes?: TokenAttribute[] | null | undefined;
};

type TokenAttribute = {
	trait_type: string;
	value: string;
	display_type?: string | null | undefined;
};

type ContractAddresses = {
	MarketAddress: string;
};
