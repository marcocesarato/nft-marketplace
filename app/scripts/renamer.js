/**
 * Rename files extension recursively
 */
const path = require("path");
const fs = require("fs");

const args = process.argv.slice(2);
const dir = args[0];
const search = args[1];
const replaceWith = args[2];

const list = (dir, fileList = []) => {
	const files = fs.readdirSync(dir);

	files.forEach((file) => {
		if (fs.statSync(path.join(dir, file)).isDirectory()) {
			fileList = list(path.join(dir, file), fileList);
		} else {
			if (new RegExp(`[.]${search}$`, "g").test(file)) {
				const name = file.split(".")[0].replace(/\s/g, "_") + `.${replaceWith}`;
				const src = path.join(dir, file);
				const newSrc = path.join(dir, name);
				fileList.push({
					currentPath: src,
					newPath: newSrc,
				});
			}
		}
	});

	return fileList;
};

const foundFiles = list(dir);
foundFiles.forEach((f) => {
	fs.renameSync(f.currentPath, f.newPath);
});
