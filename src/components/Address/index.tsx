import {ExternalLinkIcon} from "@chakra-ui/icons";
import {Link, Text} from "@chakra-ui/react";

import useAccount from "@hooks/useAccount";
import {formatAddress} from "@utils/formatters";
import {getExplorer} from "@utils/networks";

const Address = ({label, address, name = null, ...props}): JSX.Element => {
	const {chainId} = useAccount();
	return (
		<Text {...props} verticalAlign="middle">
			{label}
			<Link href={`${getExplorer(chainId)}address/${address}`} target="_blank" ml={1}>
				{name || formatAddress(address)}
				<ExternalLinkIcon mx={1} mt={-1} />
			</Link>
		</Text>
	);
};

export default Address;
