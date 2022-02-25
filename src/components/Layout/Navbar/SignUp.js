import {useState} from "react";
import {Button, Stack, Input} from "@chakra-ui/react";
import useAccount from "@hooks/useAccount";

export default function SignUp({onSuccess}) {
	const {signup} = useAccount();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [repeatPassword, setRepeatPassword] = useState();

	const onSubmit = async () => {
		if (password !== repeatPassword) {
			await signup(email, password, email);
			onSuccess();
		}
	};

	return (
		<Stack spacing={3}>
			<Input
				placeholder="Email"
				value={email}
				autoComplete={false}
				onChange={(event) => setEmail(event.currentTarget.value)}
			/>
			<Input
				placeholder="Password"
				type="password"
				value={password}
				autoComplete={false}
				onChange={(event) => setPassword(event.currentTarget.value)}
			/>
			<Input
				placeholder="Repeat Password"
				type="password"
				value={repeatPassword}
				autoComplete={false}
				onChange={(event) => setRepeatPassword(event.currentTarget.value)}
			/>
			<Button onClick={onSubmit}>Sign up</Button>
		</Stack>
	);
}
