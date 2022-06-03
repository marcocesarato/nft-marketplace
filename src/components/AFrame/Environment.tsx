import "./IntrinsicElements";

export default function Environment({
	config,
	...props
}: {
	config: string;
	[key: string]: any;
}): JSX.Element {
	return <a-entity environment={config} {...props} />;
}
