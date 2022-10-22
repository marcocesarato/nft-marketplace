/* global NAF */

class NafInterface {
	notImplemented(name) {
		NAF.log.error("Interface method not implemented:", name);
	}
}
export default NafInterface;
