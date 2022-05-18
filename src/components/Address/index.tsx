import NextLink from "next/link";
import {Flex, HStack, Link, Text} from "@chakra-ui/react";

import Avatar from "@components/Avatar";
import {formatAddress} from "@utils/formatters";

const Address = ({address, name = null, label = null, ...props}): JSX.Element => {
	return (
		<HStack alignItems="flex-start" justifyContent="center" {...props}>
			{label && <Text whiteSpace="nowrap">{label}</Text>}
			<NextLink href={`/account/${address}`} passHref>
				<Link width="full">
					<Flex>
						<Avatar address={address} />
						<Text ml={2}>{name || formatAddress(address)}</Text>
					</Flex>
				</Link>
			</NextLink>
		</HStack>
	);
};

export default Address;
