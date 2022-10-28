"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = exports.NexusListDef = void 0;
const graphql_1 = require("graphql");
const nexusMeta_1 = require("./nexusMeta");
const wrapping_1 = require("./wrapping");
const _types_1 = require("./_types");
class NexusListDef {
    constructor(ofNexusType) {
        this.ofNexusType = ofNexusType;
        // @ts-ignore
        // Required field for TS to differentiate NonNull from Null from List
        this._isNexusListDef = true;
        /* istanbul ignore if */
        if (typeof ofNexusType !== 'string' &&
            !wrapping_1.isNexusStruct(ofNexusType) &&
            !nexusMeta_1.isNexusMeta(ofNexusType) &&
            !graphql_1.isType(ofNexusType)) {
            throw new Error('Cannot wrap unknown types in list(). Saw ' + ofNexusType);
        }
    }
}
exports.NexusListDef = NexusListDef;
_types_1.withNexusSymbol(NexusListDef, _types_1.NexusTypes.List);
function list(type) {
    return new NexusListDef(type);
}
exports.list = list;
//# sourceMappingURL=list.js.map