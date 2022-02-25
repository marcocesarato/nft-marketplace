import {useEffect, useRef} from "react";
import Jazzicon from "@metamask/jazzicon";
import styled from "@emotion/styled";
import useAccount from "@hooks/useAccount";

const StyledIdenticon = styled.div`
	height: 1rem;
	width: 1rem;
	border-radius: 1.125rem;
	background-color: black;
`;

export default function Avatar() {
	const ref = useRef();
	const {account} = useAccount();

	useEffect(() => {
		if (account && ref.current) {
			ref.current.innerHTML = "";
			ref.current.appendChild(Jazzicon(16, parseInt(account.slice(2, 10), 16)));
		}
	}, [account]);

	return <StyledIdenticon ref={ref} />;
}
