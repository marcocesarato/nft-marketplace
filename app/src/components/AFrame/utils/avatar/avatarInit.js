const getGender = async (glbFile) => {
	let genderAnim;
	const jsonUrl = glbFile.replace(".glb", ".json");
	const response = await fetch(jsonUrl);
	const data = await response.json();
	// Masculine models are larger in size so they use a larger animation rig
	if (data.outfitGender === "masculine") {
		genderAnim = "animated-m";
	} else {
		genderAnim = "animated-f";
	}
	return genderAnim;
};
async function receiveMessage(event) {
	if (typeof event.data !== "string" || event.data.indexOf(".glb") === -1) return;
	const genderAnim = await getGender(event.data);
	// Filter out events that are not GLB URL strings from RPM
	// Dynamically add RPM Avatar to scene
	const model = document.querySelector("#avatar .avatar");
	model.className = "avatar";
	model.setAttribute("gltf-model", `url(${event.data})`);
	model.setAttribute("scale", "2.5 2.5 2.5");
	model.setAttribute("position", "0 -3.2 0");
	model.setAttribute("rotation", "0 180 0");
	model.setAttribute("avatar-move", "");
	model.setAttribute("shadow", "receive: true");
	model.setAttribute("rig-animation", {
		remoteId: genderAnim,
		clip: "IDLE",
		loop: "repeat",
		crossFadeDuration: 0.2,
	});
	// Hide the RPM iframe
	document.getElementById("rpm-container").style.display = "none";
}
export {receiveMessage};
