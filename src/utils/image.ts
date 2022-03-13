export function pictureSize(picture: string): Promise<{height: number; width: number}> {
	return new Promise((resolve, reject) => {
		let img = new Image();
		img.onload = () => resolve({height: img.height, width: img.width});
		img.onerror = reject;
		img.src = picture;
	});
}
