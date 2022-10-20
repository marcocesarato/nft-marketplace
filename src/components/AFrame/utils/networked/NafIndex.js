import options from './options';
import utils from './utils';
import NafLogger from './NafLogger';
import Schemas from './Schemas';
import NetworkEntities from './NetworkEntities';
import NetworkConnection from './NetworkConnection';
import AdapterFactory from './adapters/AdapterFactory';

var naf = {};
naf.app = "";
naf.room = "";
naf.clientId = "";
naf.options = options;
naf.utils = utils;
naf.log = new NafLogger();
naf.schemas = new Schemas();
naf.version = "0.10.1";

naf.adapters = new AdapterFactory();
var entities = new NetworkEntities();
var connection = new NetworkConnection(entities);
naf.connection = connection;
naf.entities = entities;

module.exports = window.NAF = naf;
