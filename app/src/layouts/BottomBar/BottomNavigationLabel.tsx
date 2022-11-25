import {useMemo} from "react";
import {
	Box,
	createStylesContext,
	forwardRef,
	HTMLChakraProps,
	SystemStyleObject,
	useStyles,
} from "@chakra-ui/react";
import {cx /*, dataAttr*/} from "@chakra-ui/utils";

import {useBottomNavigationContext, useBottomNavigationItemContext} from "./useBottomNavigation";

interface IBottomNavigationLabelProps extends HTMLChakraProps<"div"> {}

export const BottomNavigationLabel = forwardRef<IBottomNavigationLabelProps, "div">(
	(props, ref) => {
		const [StylesProvider] = createStylesContext("BottomNavigationLabel");
		const {showLabel} = useBottomNavigationContext();
		const {isSelected} = useBottomNavigationItemContext();
		const styles = useStyles();

		const dataIsLabelHidden = useMemo(
			() => showLabel === "never" || (showLabel === "if-active" && !isSelected),
			[showLabel, isSelected],
		);
		/*const dataIsLabelAttrHidden = useMemo(
			() => dataAttr(dataIsLabelHidden),
			[dataIsLabelHidden],
		);*/

		const labelStyles: SystemStyleObject = {
			flex: 1,
			...styles.label,
		};

		if (dataIsLabelHidden) return null;
		return (
			<StylesProvider value={styles}>
				<Box
					ref={ref}
					className={cx("chakra-bottom-navigation__label", props.className)}
					__css={labelStyles}
					{...props}
				/>
			</StylesProvider>
		);
	},
);
