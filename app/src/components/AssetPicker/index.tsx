import {useEffect, useMemo, useState} from "react";
import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	SimpleGrid,
	useDisclosure,
} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

import {ObjectModelType} from "@app/enums";
import {TokenItem} from "@app/types";
import useIPFS from "@hooks/useIPFS";
import {objectCamelToUnderscore} from "@utils/converters";
import {getObjectModelType} from "@utils/planimetry";

export type AssetPickerProps = {
	items?: TokenItem[] | null;
	type?: ObjectModelType | ObjectModelType[];
	value: TokenItem;
	label: string;
	cleanLabel: string;
	onChange?: (asset: TokenItem | null | undefined) => void;
	onClean?: () => void;
	[key: string]: any;
};
export default function AssetPicker({
	items,
	type,
	value,
	label,
	cleanLabel,
	onChange = (_) => {},
	onClean = () => {},
	...props
}: AssetPickerProps) {
	const {t} = useTranslation();
	const [selected, setSelected] = useState<TokenItem | null | undefined>(value);
	const {isOpen, onOpen, onClose} = useDisclosure();
	const {resolveLink} = useIPFS();
	useEffect(() => {
		setSelected(value);
	}, [value]);
	const filteredItems = useMemo(() => {
		return (
			items?.filter((item) => {
				if (!type) return true;
				const itemType = getObjectModelType(item);
				if (Array.isArray(type)) return type.includes(itemType);
				return itemType === type;
			}) ?? []
		);
	}, [items]);
	return (
		<>
			<Button onClick={onOpen} {...props}>
				{label}
			</Button>
			{value != null && (
				<Button onClick={onClean} {...props}>
					{cleanLabel}
				</Button>
			)}

			<Modal isOpen={isOpen} onClose={onClose} size="2xl">
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{label}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<SimpleGrid columns={5} spacing={2}>
							{filteredItems.map((c) => {
								c = objectCamelToUnderscore(c) as TokenItem;
								const background = {
									backgroundImage: resolveLink(c.thumbnail || c.image),
									backgroundSize: "cover",
									backgroundPosition: "center",
								};
								return (
									<Button
										key={c.token_address + c.token_id}
										border={
											`${selected?.token_address}${selected?.token_id}` ===
											c.token_address + c.token_id
												? "5px solid #553C9A"
												: "none"
										}
										height="100px"
										width="100px"
										padding={0}
										minWidth="unset"
										borderRadius={3}
										_hover={background}
										_focus={background}
										_active={background}
										{...background}
										onClick={() => {
											if (!c.name) {
												return setSelected(null);
											}
											setSelected(c);
										}}></Button>
								);
							})}
						</SimpleGrid>
					</ModalBody>

					<ModalFooter>
						<Button variant="ghost" colorScheme="purple" mr={3} onClick={onClose}>
							{t<string>("common:action.close")}
						</Button>
						<Button
							colorScheme="purple"
							onClick={() => {
								onChange(selected);
								onClose();
							}}>
							{t<string>("common:action.confirm")}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
