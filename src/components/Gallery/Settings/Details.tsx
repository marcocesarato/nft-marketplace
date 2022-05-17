import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Select,
	VStack,
} from "@chakra-ui/react";

import {PlanimetryBlockType} from "@app/types/enums";
import useGalleryPlanimetry from "@contexts/GalleryPlanimetry";

const blockTypesOptions = [
	{value: PlanimetryBlockType.Wall.toString(), label: "Wall"},
	{value: PlanimetryBlockType.Floor.toString(), label: "Floor"},
];

export default function GalleryBlockDetails(): JSX.Element {
	const {selected, onChangeBlock} = useGalleryPlanimetry();
	if (!selected) return null;
	return (
		<VStack spacing={4} flex={1} maxWidth={300}>
			<Accordion defaultIndex={[0, 1, 2]} allowMultiple width={"full"}>
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
							<Select
								width={"full"}
								onChange={(e) => {
									selected.type = e.target.value as PlanimetryBlockType;
									onChangeBlock(selected.id, selected);
								}}>
								{blockTypesOptions.map((option) => (
									<option
										key={option.value}
										value={option.value}
										selected={option.value === selected.type}>
										{option.label}
									</option>
								))}
							</Select>
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
