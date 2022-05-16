import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	VStack,
} from "@chakra-ui/react";
import {Select} from "chakra-react-select";

import {PlanimetryBlockType} from "@app/types/enums";

const blockTypesOptions = [
	{value: PlanimetryBlockType.Wall.toString(), label: "Wall"},
	{value: PlanimetryBlockType.Floor.toString(), label: "Floor"},
	{value: PlanimetryBlockType.Door.toString(), label: "Ceiling"},
];

export default function GalleryBlockDetails({
	selected,
	onChangeBlock,
	onChangeBlockType,
}): JSX.Element {
	if (!selected) return null;
	return (
		<VStack spacing={4} flex={1} maxWidth={300}>
			<Accordion defaultIndex={[0]} allowMultiple>
				<AccordionItem>
					<h2>
						<AccordionButton>
							<Box flex="1" textAlign="left">
								Block type
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel pb={4}>
						<VStack spacing={4}>
							<Box>
								<Select
									placeholder="Block type"
									value={selected.type.toString()}
									options={blockTypesOptions}
									onChange={(option) => {
										onChangeBlockType(
											selected.id,
											option.value as PlanimetryBlockType,
										);
									}}
								/>
							</Box>
						</VStack>
					</AccordionPanel>
				</AccordionItem>
				<AccordionItem>
					<h2>
						<AccordionButton>
							<Box flex="1" textAlign="left">
								Floor
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel pb={4}>Lorem ipsum dolor sit amet</AccordionPanel>
				</AccordionItem>
				<AccordionItem>
					<h2>
						<AccordionButton>
							<Box flex="1" textAlign="left">
								Wall Top
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel pb={4}>Lorem ipsum dolor sit amet</AccordionPanel>
				</AccordionItem>
				<AccordionItem>
					<h2>
						<AccordionButton>
							<Box flex="1" textAlign="left">
								Wall Bottom
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel pb={4}>Lorem ipsum dolor sit amet</AccordionPanel>
				</AccordionItem>
			</Accordion>
		</VStack>
	);
}
