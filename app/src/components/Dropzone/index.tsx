import {useCallback, useMemo} from "react";
import DropzoneWrapper from "react-dropzone";
import {AiOutlineCloudUpload} from "react-icons/ai";
import {Center, Heading, Icon, Text, useColorModeValue} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

import {acceptAudio, acceptImage, acceptModel, acceptVideo} from "@configs/uploads";

export enum DropzoneType {
	All = "All",
	Image = "Image",
	Animation = "Animation",
}
type DropzoneProps = {
	name?: string;
	type?: DropzoneType;
	onFileAccepted: (acceptedFiles: File) => void;
};

const acceptImageMime = {"image/*": acceptImage};
const acceptModelMime = {"application/octet-stream": acceptModel};
const acceptVideoMime = {"video/*": acceptVideo};
const acceptAudioMime = {"audio/*": acceptAudio};
const acceptAnimationMime = {
	...acceptModelMime,
	...acceptVideoMime,
	...acceptAudioMime,
};
const acceptAllMime = {
	...acceptImageMime,
	...acceptModelMime,
	...acceptVideoMime,
	...acceptAudioMime,
};

export default function Dropzone({
	onFileAccepted,
	type = DropzoneType.All,
	name = "dropzone",
}: DropzoneProps): JSX.Element {
	const {t} = useTranslation();
	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			onFileAccepted(acceptedFiles[0]);
		},
		[onFileAccepted],
	);
	const acceptTypes = useMemo(
		() =>
			type === DropzoneType.Image
				? acceptImageMime
				: type === DropzoneType.Animation
				? acceptAnimationMime
				: acceptAllMime,
		[type],
	);

	const activeBg = useColorModeValue("gray.100", "gray.700");
	const borderColor = useColorModeValue("gray.200", "gray.700");

	return (
		<DropzoneWrapper onDrop={onDrop} accept={acceptTypes} maxFiles={1} multiple={false}>
			{({getRootProps, getInputProps, isDragActive}) => {
				const dropText = isDragActive
					? t<string>("common:input.dropzone.dropMessage")
					: t<string>("common:input.dropzone.dragMessage");
				const dropExtensions = Object.values(acceptTypes)
					.join(",")
					.replaceAll(",", ", ")
					.replaceAll(".", "");
				return (
					<Center
						p={10}
						cursor="pointer"
						bg={isDragActive ? activeBg : "transparent"}
						_hover={{bg: activeBg}}
						transition="background-color 0.2s ease"
						borderRadius={4}
						border="2px solid"
						flexDirection="column"
						borderColor={borderColor}
						{...getRootProps()}>
						<input {...getInputProps()} name={name} />
						<Heading>
							<Icon color={"gray.500"} as={AiOutlineCloudUpload} mr={2} />
						</Heading>
						<Text color={"gray.500"}>{dropText}</Text>
						<Text fontSize="xs" color={"gray.500"}>
							({dropExtensions})
						</Text>
					</Center>
				);
			}}
		</DropzoneWrapper>
	);
}
