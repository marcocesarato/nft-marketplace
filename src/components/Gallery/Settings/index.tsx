import {useEffect} from "react";
import {Box, HStack} from "@chakra-ui/react";

import useGalleryPlanimetry from "@contexts/GalleryPlanimetry";
import {isValidPlanimetry} from "@utils/planimetry";

import Details from "./Details";
import Map from "./Map";
import Toolbar from "./Toolbar";

export default function GallerySettings(): JSX.Element {
	const {planimetry, selected, clearMap} = useGalleryPlanimetry();

	const onSave = () => {
		const isValid = isValidPlanimetry(planimetry);
		if (isValid) {
			// TODO: save to user data
		}
	};

	// TODO: REMOVE THIS, just for testing
	useEffect(() => {
		clearMap();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Box>
			<HStack isInline alignItems={"flex-start"}>
				<Toolbar onSave={onSave} />
				<Map />
				{selected && <Details />}
			</HStack>
		</Box>
	);
}
