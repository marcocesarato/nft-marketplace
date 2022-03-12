import {ErrorBoundary as ReactErrorBoundary} from "react-error-boundary";

import ErrorFallback from "./ErrorFallback";

export default function ErrorBoundary(props): JSX.Element {
	return <ReactErrorBoundary FallbackComponent={ErrorFallback} {...props} />;
}
