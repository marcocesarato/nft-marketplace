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

import {PlanimetryBlockType} from "@app/types/enums";
import useGalleryPlanimetry from "@contexts/GalleryPlanimetry";
import {getInsideWallFloor, getNeighborsDetails} from "@utils/planimetry";

const blockTypesOptions = [
	{value: PlanimetryBlockType.Wall.toString(), label: "Wall"},
	{value: PlanimetryBlockType.Floor.toString(), label: "Floor"},
];

export default function GalleryBlockDetails(): JSX.Element {
	const {selected, onChangeBlock, planimetry} = useGalleryPlanimetry();
	let sections = {
		"ceiling": false,
		"ground": false,
		"left": false,
		"right": false,
		"top": false,
		"bottom": false,
	};
	const neightbours = useMemo(
		() => (selected && planimetry ? getNeighborsDetails(selected.id, planimetry) : []),
		[selected, planimetry],
	);
	const insideWallFloor = useMemo(
		() => (planimetry ? getInsideWallFloor(planimetry) : new Set()),
		[planimetry],
	);
	if (selected) {
		if (selected.type === PlanimetryBlockType.Floor && insideWallFloor.has(selected.id)) {
			// If selected is a floor enable ground and ceiling section
			sections.ground = true;
			sections.ceiling = true;
		}
		// If selected is a wall check if neightbours are floors then enable direction sections to place objects
		if (selected.type === PlanimetryBlockType.Wall) {
			neightbours.forEach((neightbour) => {
				if (
					neightbour.type === PlanimetryBlockType.Floor &&
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
		.map((section, index) => (section ? index : null))
		.filter(Boolean);
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
