import { NexusTypes, withNexusSymbol } from './definitions/_types';
export class DynamicInputMethodDef {
    constructor(name, config) {
        this.name = name;
        this.config = config;
    }
    get value() {
        return this.config;
    }
}
withNexusSymbol(DynamicInputMethodDef, NexusTypes.DynamicInput);
export class DynamicOutputMethodDef {
    constructor(name, config) {
        this.name = name;
        this.config = config;
    }
    get value() {
        return this.config;
    }
}
withNexusSymbol(DynamicOutputMethodDef, NexusTypes.DynamicOutputMethod);
/**
 * Defines a new property on the object definition block for an output type, taking arbitrary input to define
 * additional types. See the connectionPlugin:
 *
 * T.connectionField('posts', { nullable: true, totalCount(root, args, ctx, info) { return
 * ctx.user.getTotalPostCount(root.id, args) }, nodes(root, args, ctx, info) { return
 * ctx.user.getPosts(root.id, args) } })
 */
export function dynamicOutputMethod(config) {
    return new DynamicOutputMethodDef(config.name, config);
}
/** Same as the outputFieldExtension, but for fields that should be added on as input types. */
export function dynamicInputMethod(config) {
    return new DynamicInputMethodDef(config.name, config);
}
//# sourceMappingURL=dynamicMethod.js.map