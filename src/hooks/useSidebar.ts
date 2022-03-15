import {useEffect, useMemo} from "react";
import {useBreakpointValue} from "@chakra-ui/react";

import {useConfig} from "@contexts/Global";

import useLocalStorage from "./useLocalStorage";

const baseWidth = "260px";
const compressWidth = "70px";

export default function useSidebar(): {
	sidebarWidth: string | number;
	isOpenSidebar: boolean;
	isSidebarCompress: boolean;
	onToggleSidebar: () => void;
} {
	const {isOpenSidebar, setConfig} = useConfig();
	const [isOpen, setIsOpen] = useLocalStorage<boolean>("sidebarOpen", false);
	const canCompress = useBreakpointValue({base: false, lg: true});

	const isSidebarCompress = useMemo(() => {
		return !isOpenSidebar && canCompress;
	}, [canCompress, isOpenSidebar]);

	const sidebarWidth = useMemo(
		() => (isSidebarCompress ? compressWidth : baseWidth),
		[isSidebarCompress],
	);

	useEffect(() => {
		setConfig({isOpenSidebar: isOpen});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen]);

	const onToggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	return {sidebarWidth, isOpenSidebar, isSidebarCompress, onToggleSidebar};
}
