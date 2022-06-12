import {memo} from "react";
import {Button, useDisclosure} from "@chakra-ui/react";

import Alert from "@components/Alert";

function ToolButton({
	onClick,
	children = null,
	icon = null,
	size = "sm",
	isActive = true,
	withConfirm = false,
	confirmTitle = "",
	confirmContent = "",
	confirmButtonText = "",
	cancelButtonText = "",
	...props
}): JSX.Element {
	const {isOpen, onOpen, onClose} = useDisclosure();
	return (
		<>
			<Button
				size={size}
				w={"full"}
				leftIcon={icon}
				onClick={withConfirm ? onOpen : onClick}
				justifyContent="flex-start"
				px={4}
				isActive={isActive}
				{...props}>
				{children}
			</Button>
			{withConfirm && (
				<Alert
					title={confirmTitle}
					content={confirmContent}
					onConfirm={onClick}
					onClose={onClose}
					onCancel={onClose}
					isOpen={isOpen}
					confirmText={confirmButtonText}
					cancelText={cancelButtonText}
				/>
			)}
		</>
	);
}

export default memo(ToolButton);
