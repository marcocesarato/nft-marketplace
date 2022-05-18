import {useEffect} from "react";
import {Box, HStack} from "@chakra-ui/react";

import useGalleryPlanimetry from "@contexts/GalleryPlanimetry";
import useUser from "@hooks/useUser";
import {useUserUpdatePlanimetryMutation} from "@services/graphql";
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
			const plan = JSON.parse(
				JSON.stringify(planimetry, (_key, value) =>
					value instanceof Set ? [...value] : value,
				),
			);
			userUpdate({
				variables: {
					planimetry: plan,
				},
			});
		}
	};
	useEffect(() => {
		if (!isLoading && user?.planimetry) {
			setPlanimetry(user.planimetry);
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
