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
