import {Global} from "@emotion/react";

const GlobalStyles = () => (
	<Global
		styles={`
            html.a-fullscreen .a-canvas.a-grab-cursor, html.a-fullscreen #a-scene canvas.a-canvas {
                position: static !important;
            }
            @font-face {
                font-family: "Euclid Circular";
                src: url("/assets/fonts/Euclid Circular A Regular.ttf") format("truetype");
                font-weight: normal;
                font-style: normal;
            }

            @font-face {
                font-family: "Euclid Circular";
                src: url("/assets/fonts/Euclid Circular A Italic.ttf") format("truetype");
                font-weight: normal;
                font-style: italic;
            }

            @font-face {
                font-family: "Euclid Circular";
                src: url("/assets/fonts/Euclid Circular A Bold.ttf") format("truetype");
                font-weight: bold;
                font-style: normal;
            }

            @font-face {
                font-family: "Euclid Circular";
                src: url("/assets/fonts/Euclid Circular A Bold Italic.ttf") format("truetype");
                font-weight: bold;
                font-style: italic;
            }

            @font-face {
                font-family: "Euclid Circular";
                src: url("/assets/fonts/Euclid Circular A SemiBold.ttf") format("truetype");
                font-weight: semibold;
                font-style: normal;
            }

            @font-face {
                font-family: "Euclid Circular";
                src: url("/assets/fonts/Euclid Circular A SemiBold Italic.ttf") format("truetype");
                font-weight: semibold;
                font-style: italic;
            }


            @font-face {
                font-family: "Euclid Circular";
                src: url("/assets/fonts/Euclid Circular A Medium.ttf") format("truetype");
                font-weight: medium;
                font-style: normal;
            }

            @font-face {
                font-family: "Euclid Circular";
                src: url("/assets/fonts/Euclid Circular A Medium Italic.ttf") format("truetype");
                font-weight: medium;
                font-style: italic;
            }
      `}
	/>
);

export default GlobalStyles;
