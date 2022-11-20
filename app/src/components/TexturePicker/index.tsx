import {
	Box,
	Button,
	Center,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	SimpleGrid,
} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

import {TextureAsset} from "@app/types";
import {Textures} from "@configs/gallery";

export type TexturePickerProps = {
	value: TextureAsset | null | undefined;
	onChange: (value: TextureAsset) => void;
};

export default function TexturePicker({value, onChange}: TexturePickerProps) {
	const {t} = useTranslation();
	const options = [
		{
			name: "",
			image: null,
		},
		...Object.values(Textures),
	];
	return (
		<Box>
			<Popover variant="picker">
				<PopoverTrigger>
					<Button
						backgroundImage={value?.image}
						backgroundSize="cover"
						height="22px"
						width="22px"
						padding={0}
						minWidth="unset"
						borderRadius={3}></Button>
				</PopoverTrigger>
				<PopoverContent width="170px">
					<PopoverArrow backgroundImage={value?.image} />
					<PopoverCloseButton value="white" />
					<PopoverHeader
						height="100px"
						backgroundImage={value?.image}
						backgroundSize="cover"
						borderTopLeftRadius={5}
						borderTopRightRadius={5}
						color="white">
						<Center height="100%">{t<string>(`texture.${value?.name}`)}</Center>
					</PopoverHeader>
					<PopoverBody height="120px">
						<SimpleGrid columns={5} spacing={2}>
							{options.map((c) => {
								const background = {
									backgroundImage: c.image,
									backgroundSize: "cover",
									backgroundPosition: "center",
								};
								return (
									<Button
										key={c.name}
										height="22px"
										width="22px"
										padding={0}
										minWidth="unset"
										borderRadius={3}
										_hover={background}
										_focus={background}
										_active={background}
										{...background}
										onClick={() => {
											if (!c.name) {
												return onChange(null);
											}
											onChange(c as TextureAsset);
										}}></Button>
								);
							})}
						</SimpleGrid>
					</PopoverBody>
				</PopoverContent>
			</Popover>
		</Box>
	);
}
