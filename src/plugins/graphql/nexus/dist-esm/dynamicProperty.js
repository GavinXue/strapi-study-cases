import { NexusTypes, withNexusSymbol } from './definitions/_types';
export class DynamicOutputPropertyDef {
    constructor(name, config) {
        this.name = name;
        this.config = config;
    }
    get value() {
        return this.config;
    }
}
withNexusSymbol(DynamicOutputPropertyDef, NexusTypes.DynamicOutputProperty);
/**
 * Defines a new property on the object definition block for an output type, making it possible to build
 * custom DSL's on top of Nexus, e.g. in nexus-prisma
 *
 * T.model.posts()
 */
export function dynamicOutputProperty(config) {
    return new DynamicOutputPropertyDef(config.name, config);
}
//# sourceMappingURL=dynamicProperty.js.map