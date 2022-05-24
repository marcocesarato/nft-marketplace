import {useCallback, useEffect} from "react";
import {Box, HStack} from "@chakra-ui/react";

import {PlanimetryMap} from "@app/types";
import useGallery from "@contexts/Gallery";
import useUser from "@hooks/useUser";
import {useUserUpdatePlanimetryMutation} from "@services/graphql";
import {clone} from "@utils/converters";

import Details from "./Details";
import Map from "./Map";
import Toolbar from "./Toolbar";

export default function GallerySettings(): JSX.Element {
	const {schema, setPlanimetry} = useGallery();
	const {user, isLoading} = useUser();
	const [userUpdate] = useUserUpdatePlanimetryMutation();

	const onSave = useCallback(() => {
		if (schema.isValidPlanimetry()) {
			const schemaMap = schema.getMap();
			const planimetry = clone(schemaMap);
			userUpdate({
				variables: {
					planimetry,
				},
			});
		}
	}, [schema, userUpdate]);

	useEffect(() => {
		if (!isLoading && user?.planimetry && Object.keys(user?.planimetry).length > 0) {
			setPlanimetry(user.planimetry as PlanimetryMap);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, isLoading]);

	return (
		<Box>
			<HStack isInline alignItems={"flex-start"}>
				<Toolbar onSave={onSave} />
				<Map />
				<Details />
			</HStack>
		</Box>
	);
}
