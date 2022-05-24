import {DOMAttributes} from "react";

type AFrameElement<T> = Partial<T & DOMAttributes<T> & {children: any}>;
declare global {
	namespace JSX {
		interface IntrinsicElements {
			["a-scene"]: AFrameElement<any>;
			["a-entity"]: AFrameElement<any>;
			["a-plane"]: AFrameElement<any>;
			["a-sphere"]: AFrameElement<any>;
			["a-sky"]: AFrameElement<any>;
			["a-light"]: AFrameElement<any>;
		}
	}
}
