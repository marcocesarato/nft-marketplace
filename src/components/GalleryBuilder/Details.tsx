import {useMemo} from "react";
import {CloseIcon} from "@chakra-ui/icons";
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	IconButton,
	Select,
	VStack,
} from "@chakra-ui/react";

import {MapDirectionEnum, PlanimetryBlockType, PlanimetryBlockTypeEnum} from "@app/enums";
import AssetPicker from "@components/AssetPicker";
import useGallery from "@contexts/Gallery";

export default function GalleryBlockDetails(): JSX.Element {
	const {schema, selected, onChangeBlock, onSelect} = useGallery();
	const blockTypesOptions = useMemo(() => {
		const types = [
			{value: PlanimetryBlockTypeEnum.Wall.toString(), label: "Wall"},
			{value: PlanimetryBlockTypeEnum.Floor.toString(), label: "Floor"},
			{value: PlanimetryBlockTypeEnum.Window.toString(), label: "Window"},
		];
		if (selected && !schema.isRoomPerimeter(selected.id)) {
			types.push({value: PlanimetryBlockTypeEnum.Door.toString(), label: "Door"});
		}
		return types;
	}, [selected, schema]);
	const neightbours = useMemo(
		() => (selected && schema ? schema.getNeighborsDetails(selected.id) : []),
		[selected, schema],
	);
	const insideWallFloor = useMemo(
		() => (schema ? schema.getBlocksInsideRoom() : new Set()),
		[schema],
	);
	let sections = {
		"ceiling": false,
		"floor": false,
		[MapDirectionEnum.North]: false,
		[MapDirectionEnum.West]: false,
		[MapDirectionEnum.East]: false,
		[MapDirectionEnum.South]: false,
	};
	if (selected) {
		if (selected.type === PlanimetryBlockTypeEnum.Floor && insideWallFloor.has(selected.id)) {
			sections.floor = true;
			sections.ceiling = true;
		} else if (selected.type === PlanimetryBlockTypeEnum.Wall) {
			neightbours.forEach((neightbour) => {
				if (
					neightbour.type === PlanimetryBlockTypeEnum.Floor &&
					insideWallFloor.has(neightbour.id) &&
					sections.hasOwnProperty(neightbour.direction)
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
		<VStack spacing={4} flex={1} maxWidth={300} alignItems="flex-end">
			<IconButton
				icon={<CloseIcon />}
				variant="ghost"
				size="sm"
				onClick={() => onSelect(null)}
				aria-label={""}
			/>
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
						<AccordionItem key={key}>
							<h2>
								<AccordionButton>
									<Box flex="1" textAlign="left">
										{key.charAt(0).toUpperCase() + key.slice(1)}
									</Box>
									<AccordionIcon />
								</AccordionButton>
							</h2>
							<AccordionPanel pb={4}>
								{key === "floor" || key === "ceiling" ? (
									<AssetPicker
										width="full"
										size="sm"
										mb={2}
										value={selected.items?.[key]}
										onChange={() => {}}
										label="Add new object"
									/>
								) : (
									<AssetPicker
										width="full"
										size="sm"
										mb={2}
										value={selected.items?.[key]}
										onChange={() => {}}
										label="Add new painting"
									/>
								)}
							</AccordionPanel>
						</AccordionItem>
					);
				})}
			</Accordion>
		</VStack>
	);
}
