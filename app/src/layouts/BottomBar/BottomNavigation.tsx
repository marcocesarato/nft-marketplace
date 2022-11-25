import React from "react";
import {
	Box,
	createStylesContext,
	forwardRef,
	HTMLChakraProps,
	omitThemingProps,
	ThemingProps,
	useMultiStyleConfig,
} from "@chakra-ui/react";
import {cx} from "@chakra-ui/utils";

import {
	BottomNavigationDescendantsProvider,
	BottomNavigationProvider,
	IBottomNavigationContext,
	useBottomNavigationDescendants,
} from "./useBottomNavigation";

export interface IBottomNavigationProps
	extends Omit<HTMLChakraProps<"nav">, "onChange">,
		ThemingProps<"BottomNavigation">,
		IBottomNavigationContext {}

export const BottomNavigation = forwardRef<IBottomNavigationProps, "nav">(
	({value, onChange, showLabel, ...props}, ref) => {
		const [StylesProvider] = createStylesContext("BottomNavigation");
		const styles = useMultiStyleConfig("BottomNavigation", props);
		const ownProps = omitThemingProps(props);

		const descendants = useBottomNavigationDescendants();

		const ctx = React.useMemo(
			() => ({value, onChange, showLabel}),
			[value, onChange, showLabel],
		);

		return (
			<BottomNavigationProvider value={ctx}>
				<BottomNavigationDescendantsProvider value={descendants}>
					<StylesProvider value={styles}>
						<Box
							ref={ref}
							className={cx("chakra-bottom-navigation", props.className)}
							__css={styles.container}
							{...ownProps}
						/>
					</StylesProvider>
				</BottomNavigationDescendantsProvider>
			</BottomNavigationProvider>
		);
	},
);
