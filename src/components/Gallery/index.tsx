import type {NFT, NFTMetadata} from "@app/types";
import useWebXR from "@hooks/useWebXR";

import Gallery3D from "./Gallery3D";
import GalleryVR from "./GalleryVR";

const imagesDisposition = [
	// Front
	{position: [0, 0, 1.5], rotation: [0, 0, 0]},
	// Back
	{position: [-0.8, 0, -0.6], rotation: [0, 0, 0]},
	{position: [0.8, 0, -0.6], rotation: [0, 0, 0]},
	// Left
	{position: [-1.75, 0, 0.25], rotation: [0, Math.PI / 2.5, 0]},
	{position: [-2.15, 0, 1.5], rotation: [0, Math.PI / 2.5, 0]},
	{position: [-2, 0, 2.75], rotation: [0, Math.PI / 2.5, 0]},
	// Right
	{position: [1.75, 0, 0.25], rotation: [0, -Math.PI / 2.5, 0]},
	{position: [2.15, 0, 1.5], rotation: [0, -Math.PI / 2.5, 0]},
	{position: [2, 0, 2.75], rotation: [0, -Math.PI / 2.5, 0]},
];

export default function Gallery({data}): JSX.Element {
	const {supportsVRSession} = useWebXR();
	const images =
		data?.slice(0, imagesDisposition.length).map((nft: NFT, i: number) => {
			const metadata = nft.metadata as NFTMetadata;
			return {
				id: `${nft?.token_address}${nft?.token_id}`,
				text: metadata.name,
				url: metadata.image,
				position: imagesDisposition[i].position,
				rotation: imagesDisposition[i].rotation,
			};
		}) || [];
	return supportsVRSession ? <GalleryVR data={images} /> : <Gallery3D data={images} />;
}
