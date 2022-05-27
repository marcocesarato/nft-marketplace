import {useEffect, useMemo, useRef} from "react";
import styled from "@emotion/styled";
import Jazzicon from "@metamask/jazzicon";

const StyledIdenticon = styled.div`
	height: 1rem;
	width: 1rem;
	border-radius: 100%;
	background-color: black;
	overflow: hidden;
`;

export default function Avatar({address, size = 16, ...props}): JSX.Element {
	const ref = useRef<HTMLDivElement>();

	useEffect(() => {
		if (address && ref.current) {
			ref.current.innerHTML = "";
			ref.current.appendChild(Jazzicon(size, parseInt(address.slice(2, 10), 16)));
		}
	}, [address, size]);

	const Icon = useMemo(() => {
		return styled(StyledIdenticon)`
			height: ${size}px;
			width: ${size}px;
		`;
	}, [size]);

	return <Icon ref={ref} {...props} />;
}
