const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");

class DotEnv {
	constructor(ext = null, path = null) {
		process.env.NODE_ENV = process.env.NODE_ENV || "development";
		this.path = path;
		this.ext = ext;
		this.env = {};
	}

	load() {
		if (!this.path) {
			this.path = this.find();
		}
		if (fs.existsSync(this.path)) {
			const config = dotenv.config({
				path: this.path,
			});
			this.env = dotenvExpand.expand(config)?.parsed;
			this.envString = fs.readFileSync(this.path, {encoding: "utf8", flag: "r"});
		}
		return this;
	}

	find() {
		let dotenv = null;
		let directory = path.resolve(process.cwd() || "");
		const maxDepth = 3;
		const {root} = path.parse(directory);

		const ext = this.ext ? `.${this.ext}` : "";
		const priorities = {
			[`.env${ext}.${process.env.NODE_ENV}.local`]: 4,
			[`.env${ext}.${process.env.NODE_ENV}`]: 3,
			[`.env${ext}.local`]: 2,
			[`.env${ext}`]: 1,
		};
		const matcher = (cwd) => {
			const priority = 0;
			Object.keys(priorities).forEach((fileName) => {
				if (priorities[fileName] > priority && fs.existsSync(path.join(cwd, fileName))) {
					dotenv = path.join(cwd, fileName);
				}
			});
			const foundPath = dotenv != null ? cwd : null;
			if (typeof foundPath === "string") {
				try {
					const stat = fs.statSync(path.resolve(cwd, foundPath));
					if (stat.isDirectory()) {
						return foundPath;
					}
				} catch {}
			}
			return foundPath;
		};
		let depth = 0;
		let match = false;
		while (maxDepth ? depth < maxDepth : true) {
			depth++;
			const foundPath = matcher(directory);
			if (match) {
				break;
			}
			if (foundPath) {
				match = true;
			}
			if (directory === root) {
				break;
			}
			directory = path.dirname(directory);
		}
		return dotenv;
	}

	save(changes) {
		if (!this.envString) return;

		// https://github.com/stevenvachon/edit-dotenv
		const EOL = "\r\n";
		const breakPattern = /\n/g;
		const breakReplacement = "\\n";
		const flags = "gm";
		const groupPattern = /\$/g;
		const groupReplacement = "$$$";
		const h = "[^\\S\\r\\n]";
		const returnPattern = /\r/g;
		const returnReplacement = "\\r";

		let hasAppended = false;
		const data = Object.keys(changes).reduce((result, varname) => {
			const value = changes[varname]
				.replace(breakPattern, breakReplacement)
				.replace(returnPattern, returnReplacement)
				.trim();
			const safeName = this.escapeRegExp(varname);
			const varPattern = new RegExp(`^(${h}*${safeName}${h}*=${h}*)\\S*(${h}*)$`, flags);
			if (varPattern.test(result)) {
				const safeValue = value.replace(groupPattern, groupReplacement);
				return result.replace(varPattern, `$1${safeValue}$2`);
			} else if (result === "") {
				hasAppended = true;
				return `${varname}=${value}${EOL}`;
			} else if (!result.endsWith(EOL) && !hasAppended) {
				hasAppended = true;
				// Add an extra break between previously defined and newly appended variable
				return `${result}${EOL}${EOL}${varname}=${value}`;
			} else if (!result.endsWith(EOL)) {
				// Add break for appended variable
				return `${result}${EOL}${varname}=${value}`;
			} else if (result.endsWith(EOL) && !hasAppended) {
				hasAppended = true;
				// Add an extra break between previously defined and newly appended variable
				return `${result}${EOL}${varname}=${value}${EOL}`;
			} /*if (result.endsWith(EOL))*/ else {
				// Add break for appended variable
				return `${result}${varname}=${value}${EOL}`;
			}
		}, this.envString);
		return fs.writeFileSync(this.path, data, {
			encoding: "utf8",
		});
	}

	escapeRegExp(string) {
		return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
	}
}

module.exports = {
	DotEnv,
	dotenvLoad: (...args) => {
		const dotenv = new DotEnv(...args);
		return dotenv.load();
	},
};
