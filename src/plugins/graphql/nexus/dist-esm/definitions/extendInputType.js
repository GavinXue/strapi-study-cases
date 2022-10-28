import { assertValidName } from 'graphql';
import { NexusTypes, withNexusSymbol } from './_types';
export class NexusExtendInputTypeDef {
    constructor(name, config) {
        this.name = name;
        this.config = config;
        assertValidName(name);
    }
    get value() {
        return this.config;
    }
}
withNexusSymbol(NexusExtendInputTypeDef, NexusTypes.ExtendInputObject);
/**
 * Adds new fields to an existing inputObjectType in the schema. Useful when splitting your schema across
 * several domains.
 *
 * @see https://nexusjs.org/docs/api/extend-type
 */
export function extendInputType(config) {
    return new NexusExtendInputTypeDef(config.type, Object.assign(Object.assign({}, config), { name: config.type }));
}
//# sourceMappingURL=extendInputType.js.map