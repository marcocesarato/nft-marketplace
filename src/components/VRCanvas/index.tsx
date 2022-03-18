import dynamic from "next/dynamic";

// @ts-ignore
const {VRCanvas} = dynamic(() => import("@react-three/xr"), {ssr: false});

export default VRCanvas;
