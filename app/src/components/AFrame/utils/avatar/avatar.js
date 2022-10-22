const avatarMoveComponent = {
	schema: {
		speed: {type: "number", default: 0.007}, // base movement speed
	},
	init() {
		this.camera = document.getElementById("camera");
		this.avatar = this.el.object3D;
		if (this.el.parentNode.id !== "avatar") return;
		this.handleTouch = (e) => {
			this.isMoving = true;
			this.positionRaw = e.detail.positionRaw;
			this.startPositionRaw = this.startPositionRaw || this.positionRaw;
		};
		this.clearTouch = (e) => {
			this.startPositionRaw = null;
			this.isMoving = false;
		};
		window.addEventListener("onefingerstart", this.handleTouch);
		window.addEventListener("onefingermove", this.handleTouch);
		window.addEventListener("onefingerend", this.clearTouch);
		this.hasGamepad = false;
		// traditional gamepad setup
		window.addEventListener("gamepadconnected", (e) => {
			this.hasGamepad = true;
		});
		// xr controller setup
		this.el.sceneEl.addEventListener("enter-vr", () => {
			this.el.sceneEl.xrSession.addEventListener("inputsourceschange", (e) => {
				if (e.added.length !== 0) {
					if (e.added[0].gamepad.axes.length === 0) {
						this.vrType = "hands";
					} else if (e.added[0].gamepad.axes.length === 4) {
						this.vrType = "controllers";
					}
				}
				this.hasGamepad = true;
				this.isInHeadset = true;
			});
		});
		this.usingKeyboard = false;
		const handleKeyDown = (e) => {
			this.isMoving = true;
			if (e.key === "ArrowUp" || e.key === "w") {
				this.fwd = true;
			}
			if (e.key === "ArrowDown" || e.key === "s") {
				this.back = true;
			}
			if (e.key === "ArrowLeft" || e.key === "a") {
				this.left = true;
			}
			if (e.key === "ArrowRight" || e.key === "d") {
				this.right = true;
			}
			if (!this.usingKeyboard) {
				this.usingKeyboard = true;
			}
		};
		const handleKeyUp = (e) => {
			this.isMoving = false;
			if (e.key === "ArrowUp" || e.key === "w") {
				this.fwd = false;
			}
			if (e.key === "ArrowDown" || e.key === "s") {
				this.back = false;
			}
			if (e.key === "ArrowLeft" || e.key === "a") {
				this.left = false;
			}
			if (e.key === "ArrowRight" || e.key === "d") {
				this.right = false;
			}
			if (!this.usingKeyboard) {
				this.usingKeyboard = true;
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("keyup", handleKeyUp);
	},
	update() {
		this.speed = this.data.speed;
	},
	tick() {
		const isMoving = this.isMoving || this.fwd || this.right || this.left || this.back;
		if (isMoving) {
			// Animations to call include RUNNING, WALKING, IDLE, VICTORY, DEFEAT
			this.el.setAttribute("rig-animation", {
				clip: "RUNNING",
				loop: "repeat",
				crossFadeDuration: 0.4,
			});
		} else {
			this.el.setAttribute("rig-animation", {
				clip: "IDLE",
				loop: "repeat",
				crossFadeDuration: 0.4,
			});
			this.forward = 0;
			this.side = 0;
		}
	},
	remove() {
		window.removeEventListener("onefingerstart", this.handleTouch);
		window.removeEventListener("onefingermove", this.handleTouch);
		window.removeEventListener("onefingerend", this.clearTouch);
	},
};
export {avatarMoveComponent};
