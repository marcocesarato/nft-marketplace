import {SchemaComposer} from "graphql-compose";

import {marketItemSchemaComposer} from "./marketItem";
import {userSchemaComposer} from "./user";
import {walletSchemaComposer} from "./wallet";

const schemaComposer = new SchemaComposer();

userSchemaComposer(schemaComposer);
marketItemSchemaComposer(schemaComposer);
walletSchemaComposer(schemaComposer);

const schema = schemaComposer.buildSchema();
export default schema;
