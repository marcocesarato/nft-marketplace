import * as React from "react";

type HTMLAttributes<T> = Partial<
	T & {children: any} & React.DOMAttributes<T> &
		React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
>;

type EntityProps = {
	position?: string;
	rotation?: string;
	scale?: string;
	[key: string]: any;
};
declare global {
	namespace JSX {
		interface IntrinsicElements {
			["a-scene"]: HTMLAttributes<EntityProps>;
			["a-box"]: HTMLAttributes<EntityProps>;
			["a-plane"]: HTMLAttributes<EntityProps>;
			["a-entity"]: HTMLAttributes<EntityProps>;
			["a-plane"]: HTMLAttributes<EntityProps>;
			["a-sphere"]: HTMLAttributes<EntityProps>;
			["a-sky"]: HTMLAttributes<EntityProps>;
			["a-light"]: HTMLAttributes<EntityProps>;
			["a-torus"]: HTMLAttributes<EntityProps>;
			["a-mixin"]: HTMLAttributes<EntityProps>;
			["a-assets"]: HTMLAttributes<EntityProps>;
			["a-asset-item"]: HTMLAttributes<EntityProps>;
		}
	}
}
