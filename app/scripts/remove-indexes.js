/**
 * Remove index.js from folder recursively
 */
const path = require("path");
const fs = require("fs");

const args = process.argv.slice(2);
const dir = args[0];

const list = (dir, fileList = []) => {
	const files = fs.readdirSync(dir);

	files.forEach((file) => {
		if (fs.statSync(path.join(dir, file)).isDirectory()) {
			fileList = list(path.join(dir, file), fileList);
		} else {
			if (new RegExp(`index[.](js|ts)$`, "g").test(file)) {
				fileList.push(path.join(dir, file));
			}
		}
	});

	return fileList;
};

const foundFiles = list(dir);
foundFiles.forEach((f) => {
	fs.rmSync(f);
});
