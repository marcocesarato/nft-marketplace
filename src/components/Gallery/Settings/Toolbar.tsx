import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Button,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	VStack,
} from "@chakra-ui/react";

import useGalleryPlanimetry from "@contexts/GalleryPlanimetry";

export default function GalleryToolbar({onSave}): JSX.Element {
	const {mode, size, onChangeMode, onChangeMapSize} = useGalleryPlanimetry();
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
							<Button
								size="sm"
								w={"full"}
								onClick={() => onChangeMode("planimetry")}
								isActive={mode === "planimetry"}>
								Build walls
							</Button>
							<Button
								size="sm"
								w={"full"}
								onClick={() => onChangeMode("erase")}
								isActive={mode === "erase"}>
								Destroy walls
							</Button>
							<Button
								size="sm"
								w={"full"}
								onClick={() => onChangeMode("spawn")}
								isActive={mode === "spawn"}>
								Set spawn position
							</Button>
							<Button
								size="sm"
								w={"full"}
								onClick={() => onChangeMode("select")}
								isActive={mode === "select"}>
								Select block
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
