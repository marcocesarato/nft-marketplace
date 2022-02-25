import {ColorModeScript} from "@chakra-ui/react";
import NextDocument, {Html, Head, Main, NextScript} from "next/document";
import CSSReset from "@chakra-ui/css-reset";

export default class Document extends NextDocument {
	static getInitialProps(ctx) {
		return NextDocument.getInitialProps(ctx);
	}

	render() {
		return (
			<Html>
				<Head>
					<CSSReset />
				</Head>
				<body>
					<ColorModeScript initialColorMode="light" />
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
