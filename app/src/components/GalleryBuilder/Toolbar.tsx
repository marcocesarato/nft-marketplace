import {useState} from "react";
import {
	IoAccessibilitySharp,
	IoColorPaletteOutline,
	IoHammerOutline,
	IoRemoveCircleOutline,
	IoScanOutline,
	IoTrashBinOutline,
} from "react-icons/io5";
import {TbDoor, TbWindow} from "react-icons/tb";
import {CheckIcon} from "@chakra-ui/icons";
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Heading,
	HStack,
	IconButton,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	useDisclosure,
	VStack,
} from "@chakra-ui/react";

import {GalleryBuilderMode} from "@app/enums";
import Alert from "@components/Alert";
import ColorPicker from "@components/ColorPicker";
import TexturePicker from "@components/TexturePicker";
import useGallery from "@contexts/Gallery";

import ToolButton from "./ToolButton";

export default function Toolbar({
	onSave,
	isCanvasMode = false,
	setCanvasMode = (e: boolean) => {},
}): JSX.Element {
	const {
		mode,
		size,
		color,
		texture,
		resetMap,
		onChangeMode,
		onChangeMapSize,
		onChangeColor,
		onChangeTexture,
	} = useGallery();
	const [mapSize, setMapSize] = useState(size);
	const {
		isOpen: isOpenResizeMap,
		onOpen: onOpenResizeMap,
		onClose: onCloseResizeMap,
	} = useDisclosure();
	const openGallery = () => {
		window.open("/gallery", "_blank").focus();
	};
	return (
		<Box flex={1} maxWidth={300}>
			<Heading size="md" mb={3}>
				Settings
			</Heading>
			<Accordion defaultIndex={[0, 1]} allowMultiple>
				<AccordionItem>
					<h2>
						<AccordionButton>
							<Box flex="1" textAlign="left">
								Map size
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel pb={4}>
						<HStack width={"full"} mb={4}>
							<NumberInput
								value={mapSize}
								onChange={(_, value) => setMapSize(value)}
								size="sm"
								min={10}
								max={50}
								step={1}>
								<NumberInputField />
								<NumberInputStepper>
									<NumberIncrementStepper />
									<NumberDecrementStepper />
								</NumberInputStepper>
							</NumberInput>
							<IconButton
								size="sm"
								aria-label="Confirm map resize"
								onClick={onOpenResizeMap}
								icon={<CheckIcon />}
							/>
						</HStack>
						<HStack width={"full"}>
							<ToolButton
								justifyContent="center"
								onClick={() => setCanvasMode(false)}
								isActive={!isCanvasMode}>
								2D
							</ToolButton>
							<ToolButton
								justifyContent="center"
								onClick={() => setCanvasMode(true)}
								isActive={isCanvasMode}>
								3D
							</ToolButton>
						</HStack>
					</AccordionPanel>
				</AccordionItem>
				<AccordionItem>
					<h2>
						<AccordionButton>
							<Box flex="1" textAlign="left">
								Planimetry
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel pb={4}>
						<VStack spacing={4}>
							<ToolButton
								icon={<IoScanOutline />}
								onClick={() => onChangeMode(GalleryBuilderMode.Select)}
								isActive={mode === GalleryBuilderMode.Select}>
								Select block
							</ToolButton>
							<HStack width={"full"}>
								<ToolButton
									icon={<IoHammerOutline />}
									onClick={() => onChangeMode(GalleryBuilderMode.Planimetry)}
									isActive={mode === GalleryBuilderMode.Planimetry}>
									Build walls
								</ToolButton>
								<ToolButton
									icon={<TbDoor />}
									onClick={() => onChangeMode(GalleryBuilderMode.Doors)}
									isActive={mode === GalleryBuilderMode.Doors}
									w="auto"
								/>
								<ToolButton
									icon={<TbWindow />}
									onClick={() => onChangeMode(GalleryBuilderMode.Windows)}
									isActive={mode === GalleryBuilderMode.Windows}
									w="auto"
								/>
							</HStack>
							<HStack width={"full"}>
								<ToolButton
									icon={<IoColorPaletteOutline />}
									onClick={() => onChangeMode(GalleryBuilderMode.Color)}
									isActive={mode === GalleryBuilderMode.Color}>
									Apply color/texture
								</ToolButton>
								<ColorPicker value={color} onChange={onChangeColor} />
								<TexturePicker value={texture} onChange={onChangeTexture} />
							</HStack>
							<ToolButton
								icon={<IoAccessibilitySharp />}
								onClick={() => onChangeMode(GalleryBuilderMode.Spawn)}
								isActive={mode === GalleryBuilderMode.Spawn}>
								Place spawn
							</ToolButton>
							<ToolButton
								icon={<IoRemoveCircleOutline />}
								onClick={() => onChangeMode(GalleryBuilderMode.Erase)}
								isActive={mode === GalleryBuilderMode.Erase}>
								Erase block
							</ToolButton>
							<ToolButton
								icon={<IoTrashBinOutline />}
								onClick={resetMap}
								withConfirm={true}
								confirmTitle="Reset map"
								confirmContent="Are you sure you want reset your gallery map?">
								Reset map
							</ToolButton>
						</VStack>
					</AccordionPanel>
				</AccordionItem>
			</Accordion>
			<ToolButton
				size="lg"
				mt={4}
				w={"full"}
				colorScheme="purple"
				justifyContent="center"
				onClick={onSave}
				withConfirm={true}
				confirmTitle="Save map"
				confirmContent="Are you sure you want save your gallery map? All old data will be lost.">
				Save
			</ToolButton>
			<ToolButton size="md" mt={4} w={"full"} justifyContent="center" onClick={openGallery}>
				Open your gallery
			</ToolButton>
			<Alert
				title="Confirm resize map"
				content="Are you sure you want resize your gallery map? All old data will be lost."
				onConfirm={() => {
					onChangeMapSize(mapSize);
				}}
				onClose={onCloseResizeMap}
				onCancel={onCloseResizeMap}
				isOpen={isOpenResizeMap}
			/>
		</Box>
	);
}
