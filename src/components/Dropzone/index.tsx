import {useCallback} from "react";
import {useDropzone} from "react-dropzone";
import {AiOutlineCloudUpload} from "react-icons/ai";
import {Center, Heading, Icon, Text, useColorModeValue} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

import {acceptExts} from "@configs/uploads";

export default function Dropzone({onFileAccepted}): JSX.Element {
	const {t} = useTranslation();
	const onDrop = useCallback(
		(acceptedFiles) => {
			onFileAccepted(acceptedFiles[0]);
		},
		[onFileAccepted],
	);

	const {getRootProps, getInputProps, isDragActive} = useDropzone({
		onDrop,
		accept: acceptExts,
		maxFiles: 1,
		multiple: false,
	});

	const dropText = isDragActive
		? t<string>("common:input.dropzone.dropMessage")
		: t<string>("common:input.dropzone.dragMessage");

	const activeBg = useColorModeValue("gray.100", "gray.700");
	const borderColor = useColorModeValue("gray.200", "gray.700");

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
			<input {...getInputProps()} />
			<Heading>
				<Icon color={"gray.500"} as={AiOutlineCloudUpload} mr={2} />
			</Heading>
			<Text color={"gray.500"}>{dropText}</Text>
		</Center>
	);
}
