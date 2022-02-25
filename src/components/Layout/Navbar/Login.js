import {useState} from "react";
import {Button, Stack, Input} from "@chakra-ui/react";
import useAccount from "@hooks/useAccount";

export default function Login({onSuccess}) {
	const {login} = useAccount();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	const onSubmit = async () => {
		await login(email, password);
		onSuccess();
	};

	return (
		<Stack spacing={3}>
			<Input
				placeholder="Email"
				value={email}
				onChange={(event) => setEmail(event.currentTarget.value)}
			/>
			<Input
				placeholder="Password"
				type="password"
				value={password}
				onChange={(event) => setPassword(event.currentTarget.value)}
			/>
			<Button onClick={onSubmit}>Login</Button>
		</Stack>
	);
}
