import NextDocument, {Head, Html, Main, NextScript} from "next/document";
import {ColorModeScript} from "@chakra-ui/react";

import theme from "@app/theme";

export default class Document extends NextDocument {
	static getInitialProps(ctx) {
		return NextDocument.getInitialProps(ctx);
	}

	render() {
		return (
			<Html>
				<Head />
				<body>
					<ColorModeScript initialColorMode={theme.config.initialColorMode} />
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
