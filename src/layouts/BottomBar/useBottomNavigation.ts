import {createDescendantContext} from "@chakra-ui/descendant";
import {createContext} from "@chakra-ui/react-utils";

export const [
	BottomNavigationDescendantsProvider,
	useBottomNavigationDescendantsContext,
	useBottomNavigationDescendants,
	useBottomNavigationDescendant,
] = createDescendantContext<HTMLButtonElement>();

export interface IBottomNavigationContext {
	value: string | number;
	onChange(newValue: string | number): void;
	showLabel?: "never" | "if-active" | "always";
}

export const [BottomNavigationProvider, useBottomNavigationContext] =
	createContext<IBottomNavigationContext>({
		name: "BottomNavigationContext",
		errorMessage:
			"useBottomNavigationContext: `context` is undefined. Seems you forgot to wrap the accordion components in `<BottomNavigation />`",
	});

export interface IBottomNavigationItemContext {
	isDisabled?: boolean;
	isSelected: boolean;
	value?: string | number;
}

export const [BottomNavigationItemProvider, useBottomNavigationItemContext] =
	createContext<IBottomNavigationItemContext>({
		name: "BottomNavigationItemContext",
		errorMessage:
			"useBottomNavigationItemContext: `context` is undefined. Seems you forgot to wrap the accordion components in `<BottomNavigationItem />`",
	});
