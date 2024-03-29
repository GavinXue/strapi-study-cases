import { ownProp } from '../utils';
import { isNexusStruct, isNexusInterfaceTypeDef, isNexusObjectTypeDef } from './wrapping';
/** Symbol marking an object as something that can provide Nexus schema definitions */
export const NEXUS_TYPE = Symbol.for('@nexus/meta/NEXUS_TYPE');
export const NEXUS_BUILD = Symbol.for('@nexus/meta/NEXUS_BUILD');
export function isNexusMetaBuild(obj) {
    return obj && typeof ownProp.get(obj, NEXUS_BUILD) === 'function';
}
export function isNexusMetaType(obj) {
    return isNexusMetaTypeProp(obj) || isNexusMetaTypeFn(obj);
}
export function isNexusMetaTypeProp(obj) {
    return ownProp.has(obj, NEXUS_TYPE) && isNexusStruct(ownProp.get(obj, NEXUS_TYPE));
}
export function isNexusMetaTypeFn(obj) {
    return ownProp.has(obj, NEXUS_TYPE) && typeof ownProp.get(obj, NEXUS_TYPE) === 'function';
}
export function isNexusMeta(obj) {
    return isNexusMetaBuild(obj) || isNexusMetaType(obj) || isNexusMetaTypeFn(obj);
}
/**
 * Evaluates the thunk, replacing it with the type
 *
 * @param obj
 */
export function resolveNexusMetaType(obj) {
    let value = ownProp.get(obj, NEXUS_TYPE);
    if (typeof value === 'function') {
        value = ownProp.set(obj, NEXUS_TYPE, value.call(obj));
    }
    if (!isNexusObjectTypeDef(value) && !isNexusInterfaceTypeDef(value)) {
        throw new Error(`Expected property of NEXUS_TYPE to be an object or interface type`);
    }
    return value;
}
//# sourceMappingURL=nexusMeta.js.map