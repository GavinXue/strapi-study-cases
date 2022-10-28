import { GraphQLNullableType, GraphQLResolveInfo } from 'graphql';
import type { GraphQLPossibleOutputs } from '../definitions/_types';
import type { AllOutputTypes, GetGen, GetGen2 } from '../typegenTypeHelpers';
export interface NullabilityPluginFallbackFn {
    ctx: GetGen<'context'>;
    info: GraphQLResolveInfo;
    type: GraphQLPossibleOutputs;
}
export interface NullabilityPluginOnGuardedConfig {
    fallback: any;
    ctx: GetGen<'context'>;
    info: GraphQLResolveInfo;
    type: GraphQLNullableType;
}
export declare type NullFallbackValues = Partial<{
    [K in AllOutputTypes]: (obj: NullabilityPluginFallbackFn) => GetGen2<'rootTypes', K>;
}>;
export declare type NullabilityGuardConfig = {
    /** Whether we should guard against non-null values. Defaults to "true" if NODE_ENV === "production", false otherwise. */
    shouldGuard?: boolean;
    /**
     * When a nullish value is "guarded", meaning it is coerced into an acceptable non-null value, this function
     * will be called if supplied.
     */
    onGuarded?: (obj: NullabilityPluginOnGuardedConfig) => void;
    /** A mapping of typename to the value that should be used in the case of a null value. */
    fallbackValues?: NullFallbackValues;
};
export declare const nullabilityGuardPlugin: (pluginConfig: NullabilityGuardConfig) => import("../plugin").NexusPlugin;
