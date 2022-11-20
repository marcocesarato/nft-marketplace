import {
	Box,
	Button,
	Center,
	Input,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	SimpleGrid,
} from "@chakra-ui/react";

export type ColorPickerProps = {
	value: string | null | undefined;
	onChange: (value: string) => void;
};

export default function ColorPicker({value, onChange}: ColorPickerProps) {
	const colors = [
		"",
		"#718096",
		"#2D3748",
		"#805AD5",
		"#3182ce",
		"#38A169",
		"#D69E2E",
		"#DD6B20",
		"#E53E3E",
		"#D53F8C",
	];

	return (
		<Box>
			<Popover>
				<PopoverTrigger>
					<Button
						background={value || "gray.300"}
						height="22px"
						width="22px"
						padding={0}
						minWidth="unset"
						borderRadius={3}></Button>
				</PopoverTrigger>
				<PopoverContent width="170px">
					<PopoverArrow bg={value || "gray.300"} />
					<PopoverCloseButton value="white" />
					<PopoverHeader
						height="100px"
						backgroundColor={value || "gray.300"}
						borderTopLeftRadius={5}
						borderTopRightRadius={5}
						color="white">
						<Center height="100%">{String(value || "").toUpperCase()}</Center>
					</PopoverHeader>
					<PopoverBody height="120px">
						<SimpleGrid columns={5} spacing={2}>
							{colors.map((c) => (
								<Button
									key={c}
									aria-label={c}
									background={c || "gray.300"}
									height="22px"
									width="22px"
									padding={0}
									minWidth="unset"
									borderRadius={3}
									_hover={{background: c}}
									onClick={() => {
										onChange(c);
									}}></Button>
							))}
						</SimpleGrid>
						<Input
							borderRadius={3}
							marginTop={3}
							placeholder="Default"
							size="sm"
							value={value}
							onChange={(e) => {
								onChange(e.target.value);
							}}
						/>
					</PopoverBody>
				</PopoverContent>
			</Popover>
		</Box>
	);
}
