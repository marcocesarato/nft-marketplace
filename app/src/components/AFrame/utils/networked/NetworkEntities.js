/* global NAF */
import ChildEntityCache from "./ChildEntityCache";

class NetworkEntities {
	constructor() {
		this.entities = {};
		this.childCache = new ChildEntityCache();
		this.onRemoteEntityCreatedEvent = new Event("remoteEntityCreated");
		this._persistentFirstSyncs = {};
	}

	registerEntity(networkId, entity) {
		this.entities[networkId] = entity;
	}

	createRemoteEntity(entityData) {
		NAF.log.write("Creating remote entity", entityData);

		const networkId = entityData.networkId;
		const el = NAF.schemas.getCachedTemplate(entityData.template);

		this.initPosition(el, entityData.components);
		this.initRotation(el, entityData.components);
		this.addNetworkComponent(el, entityData);

		this.registerEntity(networkId, el);

		return el;
	}

	initPosition(entity, componentData) {
		const hasPosition = componentData["position"];
		if (hasPosition) {
			const position = componentData.position;
			entity.setAttribute("position", position);
		}
	}

	initRotation(entity, componentData) {
		const hasRotation = componentData["rotation"];
		if (hasRotation) {
			const rotation = componentData.rotation;
			entity.setAttribute("rotation", rotation);
		}
	}

	addNetworkComponent(entity, entityData) {
		const networkData = {
			template: entityData.template,
			creator: entityData.creator,
			owner: entityData.owner,
			networkId: entityData.networkId,
			persistent: entityData.persistent,
		};

		entity.setAttribute("networked", networkData);
		entity.firstUpdateData = entityData;
	}

	updateEntityMulti(client, dataType, entityDatas, source) {
		if (NAF.options.syncSource && source !== NAF.options.syncSource) return;
		for (let i = 0, l = entityDatas.d.length; i < l; i++) {
			this.updateEntity(client, "u", entityDatas.d[i], source);
		}
	}

	updateEntity(client, dataType, entityData, source) {
		if (NAF.options.syncSource && source !== NAF.options.syncSource) return;
		const networkId = entityData.networkId;

		if (this.hasEntity(networkId)) {
			this.entities[networkId].components.networked.networkUpdate(entityData);
		} else if (
			entityData.isFirstSync &&
			NAF.connection.activeDataChannels[entityData.owner] !== false
		) {
			if (NAF.options.firstSyncSource && source !== NAF.options.firstSyncSource) {
				NAF.log.write("Ignoring first sync from disallowed source", source);
			} else {
				if (entityData.persistent) {
					// If we receive a firstSync for a persistent entity that we don't have yet,
					// we assume the scene will create it at some point, so stash the update for later use.
					this._persistentFirstSyncs[networkId] = entityData;
				} else {
					this.receiveFirstUpdateFromEntity(entityData);
				}
			}
		}
	}

	receiveFirstUpdateFromEntity(entityData) {
		const parent = entityData.parent;
		const networkId = entityData.networkId;

		const parentNotCreatedYet = parent && !this.hasEntity(parent);
		if (parentNotCreatedYet) {
			this.childCache.addChild(parent, entityData);
		} else {
			const remoteEntity = this.createRemoteEntity(entityData);
			this.createAndAppendChildren(networkId, remoteEntity);
			this.addEntityToPage(remoteEntity, parent);
		}
	}

	createAndAppendChildren(parentId, parentEntity) {
		const children = this.childCache.getChildren(parentId);
		for (let i = 0; i < children.length; i++) {
			const childEntityData = children[i];
			const childId = childEntityData.networkId;
			if (this.hasEntity(childId)) {
				NAF.log.warn(
					"Tried to instantiate entity multiple times",
					childId,
					childEntityData,
					"Existing entity:",
					this.getEntity(childId),
				);
				continue;
			}
			const childEntity = this.createRemoteEntity(childEntityData);
			this.createAndAppendChildren(childId, childEntity);
			parentEntity.appendChild(childEntity);
		}
	}

	addEntityToPage(entity, parentId) {
		if (this.hasEntity(parentId)) {
			this.addEntityToParent(entity, parentId);
		} else {
			this.addEntityToSceneRoot(entity);
		}
	}

	addEntityToParent(entity, parentId) {
		this.entities[parentId].appendChild(entity);
	}

	addEntityToSceneRoot(el) {
		const scene = document.querySelector("a-scene");
		scene.appendChild(el);
	}

	completeSync(targetClientId, isFirstSync) {
		for (const id in this.entities) {
			if (this.entities[id]) {
				this.entities[id].components.networked.syncAll(targetClientId, isFirstSync);
			}
		}
	}

	removeRemoteEntity(toClient, dataType, data, source) {
		if (NAF.options.syncSource && source !== NAF.options.syncSource) return;
		const id = data.networkId;
		return this.removeEntity(id);
	}

	removeEntitiesOfClient(clientId) {
		const removedEntities = [];
		for (const id in this.entities) {
			const entity = this.entities[id];
			const creator = NAF.utils.getCreator(entity);
			const owner = NAF.utils.getNetworkOwner(entity);
			if (creator === clientId || (!creator && owner === clientId)) {
				const component = this.entities[id].getAttribute("networked");
				if (component && component.persistent) {
					// everyone will attempt to take ownership, someone will win, it does not particularly matter who
					NAF.utils.takeOwnership(entity);
				} else {
					removedEntities.push(this.removeEntity(id));
				}
			}
		}
		return removedEntities;
	}

	removeEntity(id) {
		this.forgetPersistentFirstSync(id);

		if (this.hasEntity(id)) {
			const entity = this.entities[id];
			this.forgetEntity(id);
			entity.parentNode.removeChild(entity);
			return entity;
		} else {
			NAF.log.error("Tried to remove entity I don't have.");
			return null;
		}
	}

	forgetEntity(id) {
		delete this.entities[id];
		this.forgetPersistentFirstSync(id);
	}

	getPersistentFirstSync(id) {
		return this._persistentFirstSyncs[id];
	}

	forgetPersistentFirstSync(id) {
		delete this._persistentFirstSyncs[id];
	}

	getEntity(id) {
		if (this.entities[id]) {
			return this.entities[id];
		}
		return null;
	}

	hasEntity(id) {
		return !!this.entities[id];
	}

	removeRemoteEntities() {
		this.childCache = new ChildEntityCache();

		for (const id in this.entities) {
			const owner = this.entities[id].getAttribute("networked").owner;
			if (owner !== NAF.clientId) {
				this.removeEntity(id);
			}
		}
	}
}

export default NetworkEntities;
