import {useState} from "react";
import {GrSelect} from "react-icons/gr";
import {IoHammerOutline, IoMan, IoRemoveCircleOutline, IoTrashBinOutline} from "react-icons/io5";
import {CheckIcon} from "@chakra-ui/icons";
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
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

import Alert from "@components/Alert";
import ColorPicker from "@components/ColorPicker";
import TexturePicker from "@components/TexturePicker";
import useGalleryPlanimetry from "@contexts/GalleryPlanimetry";

import ToolButton from "./ToolButton";

export default function GalleryToolbar({onSave}): JSX.Element {
	const {
		mode,
		size,
		color,
		texture,
		clearMap,
		onChangeMode,
		onChangeMapSize,
		onChangeColor,
		onChangeTexture,
	} = useGalleryPlanimetry();
	const [mapSize, setMapSize] = useState(size);
	const {
		isOpen: isOpenResizeMap,
		onOpen: onOpenResizeMap,
		onClose: onCloseResizeMap,
	} = useDisclosure();
	return (
		<Box flex={1} maxWidth={300}>
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
						<HStack width={"full"}>
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
							<HStack width={"full"}>
								<ToolButton
									icon={<IoHammerOutline />}
									onClick={() => onChangeMode("planimetry")}
									isActive={mode === "planimetry"}>
									Draw walls
								</ToolButton>
								<ColorPicker value={color} onChange={onChangeColor} />
								<TexturePicker value={texture} onChange={onChangeTexture} />
							</HStack>
							<ToolButton
								icon={<IoRemoveCircleOutline />}
								onClick={() => onChangeMode("erase")}
								isActive={mode === "erase"}>
								Destroy walls
							</ToolButton>
							<ToolButton
								icon={<IoMan />}
								onClick={() => onChangeMode("spawn")}
								isActive={mode === "spawn"}>
								Place spawn
							</ToolButton>
							<ToolButton
								icon={<GrSelect />}
								onClick={() => onChangeMode("select")}
								isActive={mode === "select"}>
								Select block
							</ToolButton>
							<ToolButton
								icon={<IoTrashBinOutline />}
								onClick={clearMap}
								withConfirm={true}
								confirmTitle="Clear map"
								confirmContent="Are you sure you want clear your gallery map?">
								Clear map
							</ToolButton>
						</VStack>
					</AccordionPanel>
				</AccordionItem>
			</Accordion>
			<ToolButton
				size="lg"
				mt={4}
				w={"full"}
				justifyContent="center"
				onClick={onSave}
				withConfirm={true}
				confirmTitle="Save map"
				confirmContent="Are you sure you want save your gallery map? All old data will be lost.">
				Save
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
