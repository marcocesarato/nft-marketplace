import {useCallback, useMemo} from "react";
import {Button, forwardRef, HTMLChakraProps, SystemStyleObject, useStyles} from "@chakra-ui/react";
import {mergeRefs} from "@chakra-ui/react-utils";
import {ariaAttr, cx} from "@chakra-ui/utils";

import {
	BottomNavigationItemProvider,
	useBottomNavigationContext,
	useBottomNavigationDescendant,
} from "./useBottomNavigation";

interface IBottomNavigationItemProps extends Omit<HTMLChakraProps<"button">, "value"> {
	value?: string | number;
}

export const BottomNavigationItem = forwardRef<IBottomNavigationItemProps, "button">(
	({value, onClick, ...props}, ref) => {
		const isDisabled = props.disabled || false;

		const styles = useStyles();

		const context = useBottomNavigationContext();

		const {index, register} = useBottomNavigationDescendant({
			disabled: isDisabled,
		});

		const itemValue = value || index;

		const isSelected = itemValue === context.value;

		const handleClick = useCallback(
			(e: React.MouseEvent<HTMLButtonElement>) => {
				onClick?.(e);
				context.onChange(itemValue);
			},
			// eslint-disable-next-line react-hooks/exhaustive-deps
			[itemValue, context.onChange],
		);

		const itemStyles: SystemStyleObject = {
			opacity: isDisabled || !isSelected ? 0.4 : 1,
			...styles.item,
		};

		const ctx = useMemo(() => ({isDisabled, isSelected}), [isDisabled, isSelected]);

		return (
			<BottomNavigationItemProvider value={ctx}>
				<Button
					ref={mergeRefs(register, ref)}
					className={cx("chakra-bottom-navigation__item", props.className)}
					__css={itemStyles}
					aria-selected={ariaAttr(isSelected)}
					onClick={handleClick}
					{...props}
				/>
			</BottomNavigationItemProvider>
		);
	},
);
