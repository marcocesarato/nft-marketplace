import {BigNumberish} from "ethers";

import {formatUnits, isNumeric, parseEther, parseUnits} from "@utils/units";

describe("parseEther", () => {
	it("should expose a function", () => {
		assert.isDefined(parseEther, "is defined");
		assert.isFunction(parseEther, "is a function");
	});

	it("should return expected output", () => {
		expect(parseEther(1)).to.equal("1000000000000000000");
	});
});

describe("parseUnits", () => {
	it("should expose a function", () => {
		assert.isDefined(parseUnits, "is defined");
		assert.isFunction(parseUnits, "is a function");
	});

	it("should return expected output", () => {
		expect(parseUnits("1")).to.equal("1000000000000000000");
		expect(parseUnits("1", 18)).to.equal("1000000000000000000");
		expect(parseUnits("1", "18")).to.equal("1000000000000000000");
	});
});

describe("formatUnits", () => {
	it("should expose a function", () => {
		assert.isDefined(formatUnits, "is defined");
		assert.isFunction(formatUnits, "is a function");
	});

	it("should return expected output", () => {
		expect(formatUnits("1000000000000000000" as BigNumberish)).to.equal(1);
	});
});

describe("isNumeric", () => {
	it("should expose a function", () => {
		assert.isDefined(isNumeric, "is defined");
		assert.isFunction(isNumeric, "is a function");
	});

	it("should return expected output", () => {
		expect(isNumeric(10)).to.be.false;
		expect(isNumeric("10")).to.be.true;
		expect(isNumeric("1-0")).to.be.false;
	});
});
