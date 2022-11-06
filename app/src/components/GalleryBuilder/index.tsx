import {useCallback, useEffect, useState} from "react";
import {Box, HStack} from "@chakra-ui/react";

import {PlanimetryMap} from "@app/types";
import useGallery from "@contexts/Gallery";
import useUser from "@hooks/useUser";
import {useUserUpdatePlanimetryMutation} from "@services/graphql";
import {clone} from "@utils/converters";

import Details from "./Details";
import Map from "./Map";
import Map3D from "./Map3D";
import Toolbar from "./Toolbar";

export default function GalleryBuilder(): JSX.Element {
	const {schema, setSchema} = useGallery();
	const {user, isLoading} = useUser();
	const [userUpdate] = useUserUpdatePlanimetryMutation();
	const [isCanvasMode, setCanvasMode] = useState(false);
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
			setSchema(user.planimetry as PlanimetryMap);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, isLoading]);

	return (
		<Box>
			<HStack isInline alignItems={"flex-start"} justifyContent="space-between">
				<Toolbar
					onSave={onSave}
					isCanvasMode={isCanvasMode}
					setCanvasMode={setCanvasMode}
				/>
				{isCanvasMode ? <Map3D /> : <Map />}
				<Details />
			</HStack>
		</Box>
	);
}
