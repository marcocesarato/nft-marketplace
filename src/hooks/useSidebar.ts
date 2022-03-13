import {useEffect} from "react";

import {useConfig} from "@contexts/Global";

import useLocalStorage from "./useLocalStorage";

export default function useSidebar(): [boolean, () => void] {
	const {isOpenSidebar, setConfig} = useConfig();
	const [isOpen, setIsOpen] = useLocalStorage<boolean>("sidebarOpen", false);

	useEffect(() => {
		setConfig({isOpenSidebar: isOpen});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen]);

	const onToggle = () => {
		setIsOpen(!isOpen);
	};

	return [isOpenSidebar, onToggle];
}
