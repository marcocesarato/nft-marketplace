import {SchemaComposer} from "graphql-compose";

import {getWalletNFTs, getWalletNFTTransfers} from "@services/api";

export function walletSchemaComposer(schemaComposer: SchemaComposer) {
	const NFTTC = schemaComposer.createObjectTC({
		name: "NFT",
		fields: {
			// Details
			"token_address": "String!",
			"token_id": "String!",
			"contract_type": "String",
			"owner_of": "String",
			"block_number": "String",
			"block_number_minted": "String",
			"token_uri": "String",
			"metadata": "JSON",
			"amount": "String",
			"symbol": "String",
			"token_hash": "String",
			"last_token_uri_sync": "String",
			"last_metadata_sync": "String",
			// Metadata
			"name": "String",
			"description": "String",
			"image": "String",
			"thumbnail": "String",
			"attributes": "JSON",
			"external_url": "String",
			"animation_url": "String",
			"youtube_url": "String",
		},
	});
	const NFTTransferTC = schemaComposer.createObjectTC({
		name: "NFTTransfer",
		fields: {
			"token_address": "String!",
			"token_id": "String!",
			"from_address": "String!",
			"to_address": "String!",
			"value": "String",
			"amount": "String",
			"contract_type": "String",
			"block_number": "String",
			"block_timestamp": "String",
			"block_hash": "String",
			"transaction_hash": "String",
			"transaction_type": "String",
			"transaction_index": "Int",
			"log_index": "Int",
			"operator": "String",
		},
	});
	schemaComposer.Query.addFields({
		walletNFTs: {
			type: [NFTTC],
			description: "Get NFTs owned by a given address.",
			args: {
				chain: "String!",
				address: "String!",
				token_address: "String",
			},
			resolve: async (_, {chain, address, token_address = null}) => {
				return await getWalletNFTs(chain, address, {token_address});
			},
		},
		accountNFT: {
			type: NFTTC,
			description: "Get NFT owned by a given address and token.",
			args: {
				chain: "String!",
				address: "String!",
				token_address: "String",
				token_id: "Int",
			},
			resolve: async (_, {chain, address, token_address = null, token_id = null}) => {
				return (await getWalletNFTs(chain, address, {token_id, token_address})?.[0]) || {};
			},
		},
		walletNFTTransfers: {
			type: [NFTTransferTC],
			description: "Get transfers of NFTs given the wallet and other parameters.",
			args: {address: "String!", chain: "String!"},
			resolve: async (_, {address, chain}) => {
				return await getWalletNFTTransfers(chain, address);
			},
		},
	});
}
