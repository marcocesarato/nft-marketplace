import {BigNumberish} from "ethers";

import {formatUnits, isNumeric, parseEther, parseUnits} from "@utils/units";

describe("parseEther", () => {
	it("should expose a function", () => {
		expect(parseEther).to.not.be.undefined;
	});

	it("parseEther should return expected output", () => {
		expect(parseEther(1)).to.equal("1000000000000000000");
	});
});

describe("parseUnits", () => {
	it("should expose a function", () => {
		expect(parseUnits).to.not.be.undefined;
	});

	it("parseUnits should return expected output", () => {
		expect(parseUnits("1", 18)).to.equal("1000000000000000000");
	});
});

describe("formatUnits", () => {
	it("should expose a function", () => {
		expect(formatUnits).to.not.be.undefined;
	});

	it("formatUnits should return expected output", () => {
		expect(formatUnits("1000000000000000000" as BigNumberish)).to.equal(1);
	});
});

describe("isNumeric", () => {
	it("should expose a function", () => {
		expect(isNumeric).to.not.be.undefined;
	});

	it("isNumeric should return expected output", () => {
		expect(isNumeric("10")).to.be.true;
		expect(isNumeric("1-0")).to.be.false;
	});
});
