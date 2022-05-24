import "./IntrinsicElements";

export default function Environment({config, ...props}: {config: string}): JSX.Element {
	return <a-entity environment={config} {...props} />;
}
