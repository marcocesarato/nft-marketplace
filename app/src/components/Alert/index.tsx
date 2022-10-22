import {useRef} from "react";
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogCloseButton,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
} from "@chakra-ui/react";

export default function Alert({
	title,
	content,
	confirmText = null,
	cancelText = null,
	onConfirm,
	onCancel,
	isOpen,
	onClose,
	color = "red",
}) {
	const cancelRef = useRef();
	return (
		<AlertDialog
			motionPreset="slideInBottom"
			leastDestructiveRef={cancelRef}
			onClose={onClose}
			isOpen={isOpen}
			isCentered>
			<AlertDialogOverlay />

			<AlertDialogContent>
				<AlertDialogHeader>{title}</AlertDialogHeader>
				<AlertDialogCloseButton />
				<AlertDialogBody>{content}</AlertDialogBody>
				<AlertDialogFooter>
					<Button
						ref={cancelRef}
						onClick={() => {
							onCancel();
							onClose();
						}}>
						{cancelText || "Cancel"}
					</Button>
					<Button
						colorScheme={color}
						ml={3}
						onClick={() => {
							onConfirm();
							onClose();
						}}>
						{confirmText || "Confirm"}
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
