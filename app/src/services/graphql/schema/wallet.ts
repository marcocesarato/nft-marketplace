import {SchemaComposer} from "graphql-compose";

import {getWalletNFTs, getWalletNFTTransfers} from "@services/api";

export function walletSchemaComposer(schemaComposer: SchemaComposer) {
	const NFTTC = schemaComposer.createObjectTC({
		name: "NFT",
		fields: {
			// Metadata
			"name": "String",
			"description": "String",
			"image": "String",
			"thumbnail": "String",
			"attributes": "JSON",
			"externalUrl": "String",
			"animationUrl": "String",
			"youtubeUrl": "String",

			// Details
			"token_id": "String!",
			"token_address": "String!",
			"token_uri": "String",
			"metadata": "JSON",
			"is_valid": "String",
			"syncing": "String",
			"frozen": "String",
			"resyncing": "String",
			"contract_type": "String",
			"token_hash": "String",
			"batch_id": "String",
			"metadata_name": "String",
			"metadata_description": "String",
			"metadata_attributes": "String",
			"block_number_minted": "String",
			"opensea_lookup": "String",
			"minter_address": "String",
			"transaction_minted": "String",
			"frozen_log_index": "String",
			"imported": "String",
			"last_token_uri_sync": "String",
			"last_metadata_sync": "String",
			"createdAt": "String",
			"updatedAt": "String",
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
