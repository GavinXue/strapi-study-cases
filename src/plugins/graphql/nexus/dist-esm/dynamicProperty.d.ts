import type { SchemaBuilder } from './builder';
import type { OutputDefinitionBlock } from './definitions/definitionBlocks';
import type { BaseExtensionConfig } from './dynamicMethod';
export declare type OutputPropertyFactoryConfig<T> = {
    stage: 'walk' | 'build';
    builder: SchemaBuilder;
    typeDef: OutputDefinitionBlock<any>;
    /** The name of the type this field is being declared on */
    typeName: string;
};
export interface DynamicOutputPropertyConfig<T extends string> extends BaseExtensionConfig<T> {
    /** Invoked when the property is accessed (as a getter) */
    factory(config: OutputPropertyFactoryConfig<T>): any;
}
export declare class DynamicOutputPropertyDef<Name extends string> {
    readonly name: Name;
    protected config: DynamicOutputPropertyConfig<Name>;
    constructor(name: Name, config: DynamicOutputPropertyConfig<Name>);
    get value(): DynamicOutputPropertyConfig<Name>;
}
/**
 * Defines a new property on the object definition block for an output type, making it possible to build
 * custom DSL's on top of Nexus, e.g. in nexus-prisma
 *
 * T.model.posts()
 */
export declare function dynamicOutputProperty<T extends string>(config: DynamicOutputPropertyConfig<T>): DynamicOutputPropertyDef<T>;
