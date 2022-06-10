import {useMemo, useState} from "react";
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

import {TokenItem} from "@app/types";
import Header from "@components/Header";
import Loading from "@components/Loading";
import useNFTs from "@hooks/useNFTs";

type AssetPickerProps = {
	value?: TokenItem;
	label: string;
	onChange: (asset: TokenItem) => void;
	[key: string]: any;
};
export default function AssetPicker({value, label, onChange, ...props}: AssetPickerProps) {
	const {t} = useTranslation();
	const [selected, setSelected] = useState(value);
	const {isOpen, onOpen, onClose} = useDisclosure();
	const {data: rawData, error, isError, isSuccess, isLoading} = useNFTs();
	const data = useMemo(() => {
		if (!isSuccess) return [];
		return rawData || [];
	}, [isSuccess, rawData]);

	if (isError) return <Header title={t<string>("error:title")} subtitle={error.message} />;
	if (isLoading) return <Loading />;
	return (
		<>
			<Button onClick={onOpen} {...props}>
				{label}
			</Button>

			<Modal isOpen={isOpen} onClose={onClose} size="2xl">
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{label}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<SimpleGrid columns={5} spacing={2}>
							{data.map((c: TokenItem) => {
								const background = {
									backgroundImage: c.metadata?.thumbnail || c.metadata?.image,
									backgroundSize: "cover",
									backgroundPosition: "center",
								};
								return (
									<Button
										key={c.token_address + c.token_id}
										border={
											selected?.token_address + selected?.token_id ===
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
