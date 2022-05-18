import {useEffect} from "react";
import {Box, HStack} from "@chakra-ui/react";

import {PlanimetryMap} from "@app/types";
import useGalleryPlanimetry from "@contexts/GalleryPlanimetry";
import useUser from "@hooks/useUser";
import {useUserUpdatePlanimetryMutation} from "@services/graphql";
import {clone} from "@utils/converters";
import {isValidPlanimetry} from "@utils/planimetry";

import Details from "./Details";
import Map from "./Map";
import Toolbar from "./Toolbar";

export default function GallerySettings(): JSX.Element {
	const {planimetry, setPlanimetry} = useGalleryPlanimetry();
	const {user, isLoading} = useUser();
	const [userUpdate] = useUserUpdatePlanimetryMutation();

	const onSave = () => {
		const isValid = isValidPlanimetry(planimetry);
		if (isValid) {
			const plan = clone(planimetry);
			userUpdate({
				variables: {
					planimetry: plan,
				},
			});
		}
	};
	useEffect(() => {
		if (!isLoading && user?.planimetry && Object.keys(user?.planimetry).length > 0) {
			console.log("user.planimetry", user.planimetry);
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
