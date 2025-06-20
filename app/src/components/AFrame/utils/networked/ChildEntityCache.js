class ChildEntityCache {
	constructor() {
		this.dict = {};
	}

	addChild(parentNetworkId, childData) {
		if (!this.hasParent(parentNetworkId)) {
			this.dict[parentNetworkId] = [];
		}
		this.dict[parentNetworkId].push(childData);
	}

	getChildren(parentNetworkId) {
		if (!this.hasParent(parentNetworkId)) {
			return [];
		}
		const children = this.dict[parentNetworkId];
		delete this.dict[parentNetworkId];
		return children;
	}

	/* Private */
	hasParent(parentId) {
		return !!this.dict[parentId];
	}
}
export default ChildEntityCache;
