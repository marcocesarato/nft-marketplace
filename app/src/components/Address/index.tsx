import NextLink from "next/link";
import {Flex, Link, Text} from "@chakra-ui/react";

import Avatar from "@components/Avatar";
import {formatAddress} from "@utils/formatters";

const Address = ({address, name = null, label = null, ...props}): JSX.Element => {
	return (
		<Flex
			direction={{base: "column", md: "row"}}
			alignItems="flex-start"
			justifyContent="center"
			{...props}>
			{label && (
				<Text whiteSpace="nowrap" mr={2}>
					{label}
				</Text>
			)}
			<NextLink href={`/account/${address}`} passHref legacyBehavior>
				<Link width="full">
					<Flex>
						<Avatar address={address} />
						<Text ml={2}>{name || formatAddress(address)}</Text>
					</Flex>
				</Link>
			</NextLink>
		</Flex>
	);
};

export default Address;
