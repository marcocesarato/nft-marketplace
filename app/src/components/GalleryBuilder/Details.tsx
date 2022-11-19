import {useCallback, useMemo} from "react";
import {CloseIcon} from "@chakra-ui/icons";
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Center,
	IconButton,
	Image,
	Select,
	VStack,
} from "@chakra-ui/react";

import {
	MapDirectionEnum,
	ObjectModelType,
	PlanimetryBlockType,
	PlanimetryBlockTypeEnum,
} from "@app/enums";
import {TokenItem} from "@app/types";
import AssetOnSalePicker from "@components/AssetPicker/OnSale";
import AssetOwnedPicker from "@components/AssetPicker/Owned";
import useGallery from "@contexts/Gallery";
import {getObjectModelType} from "@utils/planimetry";

export default function GalleryBlockDetails(): JSX.Element {
	const {schema, selected, onChangeBlockMetadata, onChangeBlock, onSelect} = useGallery();
	const blockTypesOptions = useMemo(() => {
		const types = [
			{value: PlanimetryBlockTypeEnum.Wall.toString(), label: "Wall"},
			{value: PlanimetryBlockTypeEnum.Floor.toString(), label: "Floor"},
		];
		if (selected && schema.isStraightSegment(selected.id)) {
			types.push({value: PlanimetryBlockTypeEnum.Window.toString(), label: "Window"});
			if (!schema.isRoomPerimeter(selected.id)) {
				types.push({value: PlanimetryBlockTypeEnum.Door.toString(), label: "Door"});
			}
		}
		return types;
	}, [selected, schema]);
	const neightbours = useMemo(
		() => (selected && schema ? schema.getNeighbors(selected.id) : []),
		[selected, schema],
	);
	const insideWallFloor = useMemo(
		() => (schema ? schema.getBlocksInsideRoom() : new Set()),
		[schema],
	);
	const handleChangeItem = useCallback(
		(section: number, asset: TokenItem) => {
			const objectModelType = getObjectModelType(asset);
			selected.items = selected.items ?? {};
			selected.items[section] = {
				name: asset.name,
				image: asset.image,
				type: objectModelType,
				src: asset.animation_url ?? asset.image,
				data: asset,
				sold: asset.sold !== false,
			};
			onChangeBlockMetadata(selected.id, selected);
		},
		[onChangeBlockMetadata, selected],
	);
	const handleClearItem = useCallback(
		(section: number) => {
			selected.items = selected.items ?? {};
			selected.items[section] = null;
			onChangeBlockMetadata(selected.id, selected);
		},
		[onChangeBlockMetadata, selected],
	);
	const sections = {
		"ceiling": false,
		"floor": false,
		[MapDirectionEnum.North]: false,
		[MapDirectionEnum.West]: false,
		[MapDirectionEnum.East]: false,
		[MapDirectionEnum.South]: false,
	};
	let enableItems = false;
	if (selected) {
		const isColumn = schema.isColumn(selected.id);
		const isIncidenceSegment = schema.isIncidenceSegment(selected.id);
		enableItems = !isColumn && !isIncidenceSegment;
		if (selected.type === PlanimetryBlockTypeEnum.Floor && insideWallFloor.has(selected.id)) {
			sections.floor = true;
			sections.ceiling = true;
			enableItems = true;
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
			// Disable if more than 2 items per wall
			if (Object.values(sections).filter(Boolean).length > 2) {
				enableItems = false;
			}
		}
	} else {
		return <VStack flex={1} maxWidth={300}></VStack>;
	}
	const defaultIndex = Array.from(Array(10).keys());
	return (
		<VStack
			spacing={4}
			flex={1}
			maxWidth={300}
			height="calc(100vh - 90px)"
			overflow="scroll"
			alignItems="flex-end">
			<IconButton
				icon={<CloseIcon />}
				variant="ghost"
				size="sm"
				onClick={() => onSelect(null)}
				aria-label={""}
			/>
			<Accordion defaultIndex={defaultIndex} allowMultiple width={"full"}>
				<AccordionItem key={`detail-${selected.id}-wall`}>
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
								}}
								defaultValue={selected.type}>
								{blockTypesOptions.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</Select>
						</VStack>
					</AccordionPanel>
				</AccordionItem>
				{enableItems &&
					Object.entries(sections).map(([key, value]) => {
						if (!value) return null;
						const section = key.toLowerCase();
						const objectsPicker = key === "floor" || key === "ceiling";
						return (
							<AccordionItem key={`details-${selected.id}-${key}`}>
								<h2>
									<AccordionButton>
										<Box flex="1" textAlign="left">
											{key.charAt(0).toUpperCase() + key.slice(1)}
										</Box>
										<AccordionIcon />
									</AccordionButton>
								</h2>
								<AccordionPanel pb={4}>
									{selected.items?.[section] && (
										<Box>
											<Image
												src={selected.items[section].data?.image}
												width="full"
												mb={4}
											/>
										</Box>
									)}
									<Center gap={2}>
										<AssetOwnedPicker
											type={
												objectsPicker
													? ObjectModelType.Object
													: [
															ObjectModelType.Picture,
															ObjectModelType.Video,
													  ]
											}
											width="full"
											size="sm"
											mb={2}
											display={
												!selected.items?.[section] ||
												selected.items?.[section]?.sold
													? "block"
													: "none"
											}
											value={selected.items?.[section]}
											label={objectsPicker ? "Place object" : "Place picture"}
											cleanLabel="Remove"
											onChange={handleChangeItem.bind(this, section)}
											onClean={handleClearItem.bind(this, section)}
										/>
										<AssetOnSalePicker
											type={
												objectsPicker
													? ObjectModelType.Object
													: [
															ObjectModelType.Picture,
															ObjectModelType.Video,
													  ]
											}
											width="full"
											size="sm"
											mb={2}
											display={
												!selected.items?.[section]?.sold ? "block" : "none"
											}
											value={selected.items?.[section]}
											label={objectsPicker ? "Sell object" : "Sell picture"}
											cleanLabel="Remove"
											onChange={handleChangeItem.bind(this, section)}
											onClean={handleClearItem.bind(this, section)}
										/>
									</Center>
								</AccordionPanel>
							</AccordionItem>
						);
					})}
			</Accordion>
		</VStack>
	);
}
