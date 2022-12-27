import AdapterFactory from "./adapters/AdapterFactory";
import NafLogger from "./NafLogger";
import NetworkConnection from "./NetworkConnection";
import NetworkEntities from "./NetworkEntities";
import options from "./options";
import Schemas from "./Schemas";
import utils from "./utils";

const naf = {};
naf.app = "";
naf.room = "";
naf.clientId = "";
naf.options = options;
naf.utils = utils;
naf.log = new NafLogger();
naf.schemas = new Schemas();
naf.version = "0.11.0";

naf.adapters = new AdapterFactory();
const entities = new NetworkEntities();
const connection = new NetworkConnection(entities);
naf.connection = connection;
naf.entities = entities;

export default window.NAF = naf;
