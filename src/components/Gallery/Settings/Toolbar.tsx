import {GrSelect} from "react-icons/gr";
import {IoHammerOutline, IoMan, IoRemoveCircleOutline, IoTrashBinOutline} from "react-icons/io5";
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Button,
	HStack,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	VStack,
} from "@chakra-ui/react";

import ColorPicker from "@components/ColorPicker";
import TexturePicker from "@components/TexturePicker";
import useGalleryPlanimetry from "@contexts/GalleryPlanimetry";

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
						<NumberInput
							value={size}
							onChange={(_, value) => onChangeMapSize(value)}
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
								<Button
									size="sm"
									w={"full"}
									leftIcon={<IoHammerOutline />}
									onClick={() => onChangeMode("planimetry")}
									justifyContent="flex-start"
									px={4}
									isActive={mode === "planimetry"}>
									Build walls
								</Button>
								<ColorPicker value={color} onChange={onChangeColor} />
								<TexturePicker value={texture} onChange={onChangeTexture} />
							</HStack>
							<Button
								size="sm"
								w={"full"}
								leftIcon={<IoRemoveCircleOutline />}
								onClick={() => onChangeMode("erase")}
								justifyContent="flex-start"
								px={4}
								isActive={mode === "erase"}>
								Destroy walls
							</Button>
							<Button
								size="sm"
								w={"full"}
								leftIcon={<IoMan />}
								onClick={() => onChangeMode("spawn")}
								justifyContent="flex-start"
								px={4}
								isActive={mode === "spawn"}>
								Set spawn
							</Button>
							<Button
								size="sm"
								w={"full"}
								leftIcon={<GrSelect />}
								onClick={() => onChangeMode("select")}
								justifyContent="flex-start"
								px={4}
								isActive={mode === "select"}>
								Select block
							</Button>
							<Button
								leftIcon={<IoTrashBinOutline />}
								size="sm"
								w={"full"}
								justifyContent="flex-start"
								px={4}
								onClick={clearMap}>
								Clear map
							</Button>
						</VStack>
					</AccordionPanel>
				</AccordionItem>
			</Accordion>
			<Button size="lg" mt={4} w={"full"} onClick={onSave}>
				Save
			</Button>
		</Box>
	);
}
