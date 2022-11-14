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

type AlertProps = {
	title: string;
	content: string;
	confirmText: string;
	cancelText: string;
	onConfirm: () => void;
	onCancel: () => void;
	isOpen: boolean;
	onClose: () => void;
	color: string;
};

export default function Alert({
	title,
	content,
	confirmText,
	cancelText,
	onConfirm,
	onCancel,
	isOpen,
	onClose,
	color = "red",
}: AlertProps) {
	const cancelRef = useRef<HTMLButtonElement | null>(null);
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
