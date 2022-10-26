import {useEffect, useMemo, useRef} from "react";
import {Avatar as ChakraAvatar} from "@chakra-ui/react";
import styled from "@emotion/styled";
import Jazzicon from "@metamask/jazzicon";

const StyledIdenticon = styled.div`
	height: 1rem;
	width: 1rem;
	border-radius: 100%;
	background-color: black;
	overflow: hidden;
`;

const Avatar = function ({address, size = 16, ensImage = null, ...props}): JSX.Element {
	const ref = useRef<HTMLDivElement>();

	useEffect(() => {
		if (address && ref.current && !ensImage) {
			ref.current.innerHTML = "";
			ref.current.appendChild(Jazzicon(size, parseInt(address.slice(2, 10), 16)));
		}
	}, [address, size, ensImage]);

	const Icon = useMemo(() => {
		return styled(StyledIdenticon)`
			height: ${size}px;
			width: ${size}px;
		`;
	}, [size]);

	if (ensImage) return <ChakraAvatar w={size} h={size} src={ensImage} {...props} />;

	return <Icon ref={ref} {...props} />;
};

export default Avatar;
