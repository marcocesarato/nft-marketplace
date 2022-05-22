import {useMemo} from "react";
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Button,
	Select,
	VStack,
} from "@chakra-ui/react";

import {PlanimetryBlockType, PlanimetryBlockTypeEnum} from "@app/enums";
import useGallery from "@contexts/Gallery";

const blockTypesOptions = [
	{value: PlanimetryBlockTypeEnum.Wall.toString(), label: "Wall"},
	{value: PlanimetryBlockTypeEnum.Floor.toString(), label: "Floor"},
];

export default function GalleryBlockDetails(): JSX.Element {
	const {schema, selected, onChangeBlock} = useGallery();
	let sections = {
		"ceiling": false,
		"ground": false,
		"left": false,
		"right": false,
		"top": false,
		"bottom": false,
	};
	const neightbours = useMemo(
		() => (selected && schema ? schema.getNeighborsDetails(selected.id) : []),
		[selected, schema],
	);
	const insideWallFloor = useMemo(
		() => (schema ? schema.getInsideWallBlocks() : new Set()),
		[schema],
	);
	if (selected) {
		if (selected.type === PlanimetryBlockTypeEnum.Floor && insideWallFloor.has(selected.id)) {
			// If selected is a floor enable ground and ceiling section
			sections.ground = true;
			sections.ceiling = true;
		}
		// If selected is a wall check if neightbours are floors then enable direction sections to place objects
		if (selected.type === PlanimetryBlockTypeEnum.Wall) {
			neightbours.forEach((neightbour) => {
				if (
					neightbour.type === PlanimetryBlockTypeEnum.Floor &&
					insideWallFloor.has(neightbour.id)
				) {
					sections[neightbour.direction] = true;
				}
			});
		}
	} else {
		return null;
	}
	const defaultIndex = Object.values(sections)
		.filter(Boolean)
		.map((key, i) => i);
	return (
		<VStack spacing={4} flex={1} maxWidth={300}>
			<Accordion defaultIndex={defaultIndex} allowMultiple width={"full"}>
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
				{Object.entries(sections).map(([key, value]) => {
					if (!value) return null;
					return (
						<AccordionItem>
							<h2>
								<AccordionButton>
									<Box flex="1" textAlign="left">
										{key.charAt(0).toUpperCase() + key.slice(1)}
									</Box>
									<AccordionIcon />
								</AccordionButton>
							</h2>
							<AccordionPanel pb={4}>
								<Button width="full" size="sm" mb={2} onClick={() => {}}>
									Add new object
								</Button>
								{key === "ground" ||
									(key === "ceiling" && (
										<Button width="full" size="sm" mb={2} onClick={() => {}}>
											Add new painting
										</Button>
									))}
							</AccordionPanel>
						</AccordionItem>
					);
				})}
			</Accordion>
		</VStack>
	);
}
