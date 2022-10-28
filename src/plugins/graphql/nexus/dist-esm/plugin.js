import { NexusTypes, withNexusSymbol, } from './definitions/_types';
import { isPromiseLike, venn } from './utils';
/**
 * Helper for allowing plugins to fulfill the return of the `next` resolver, without paying the cost of the
 * Promise if not required.
 */
export function completeValue(valOrPromise, onSuccess, onError) {
    if (isPromiseLike(valOrPromise)) {
        return valOrPromise.then(onSuccess, onError);
    }
    // No need to handle onError, this should just be a try/catch inside the `onSuccess` block
    const result = onSuccess(valOrPromise);
    // If the result of the synchronous call is a promise, we want to unwrap it, for
    // the return value types consistency
    if (isPromiseLike(result)) {
        return result.then((o) => o);
    }
    return result;
}
/**
 * Takes a list of middlewares and executes them sequentially, passing the "next" member of the chain to
 * execute as the 5th arg.
 *
 * @param middleware
 * @param resolver
 */
export function composeMiddlewareFns(middlewareFns, resolver) {
    let lastResolver = resolver;
    for (const middleware of middlewareFns.reverse()) {
        const currentNext = middleware;
        const previousNext = lastResolver;
        lastResolver = (root, args, ctx, info) => {
            return currentNext(root, args, ctx, info, previousNext);
        };
    }
    return lastResolver;
}
/** A definition for a plugin. Should be passed to the `plugins: []` option on makeSchema */
export class NexusPlugin {
    constructor(config) {
        this.config = config;
    }
}
withNexusSymbol(NexusPlugin, NexusTypes.Plugin);
/**
 * A plugin defines configuration which can document additional metadata options for a type definition. This
 * metadata can be used to decorate the "resolve" function to provide custom functionality, such as logging,
 * error handling, additional type validation.
 *
 * You can specify options which can be defined on the schema, the type or the plugin. The config from each of
 * these will be passed in during schema construction time, and used to augment the field as necessary.
 *
 * You can either return a function, with the new definition of a resolver implementation, or you can return
 * an "enter" / "leave" pairing which will wrap the pre-execution of the resolver and the "result" of the
 * resolver, respectively.
 */
export function plugin(config) {
    validatePluginConfig(config);
    return new NexusPlugin(config);
}
plugin.completeValue = completeValue;
// For backward compat
export const createPlugin = plugin;
/** Validate that the configuration given by a plugin is valid. */
function validatePluginConfig(pluginConfig) {
    const validRequiredProps = ['name'];
    const optionalPropFns = [
        'onInstall',
        'onCreateFieldResolver',
        'onCreateFieldSubscribe',
        'onBeforeBuild',
        'onMissingType',
        'onAfterBuild',
        'onObjectDefinition',
        'onAddOutputField',
        'onAddInputField',
        'onAddArg',
        'onInputObjectDefinition',
    ];
    const validOptionalProps = [
        'description',
        'fieldDefTypes',
        'inputFieldDefTypes',
        'objectTypeDefTypes',
        'inputObjectTypeDefTypes',
        'argTypeDefTypes',
        ...optionalPropFns,
    ];
    const validProps = [...validRequiredProps, ...validOptionalProps];
    const givenProps = Object.keys(pluginConfig);
    const printProps = (props) => {
        return [...props].join(', ');
    };
    const [missingRequiredProps, ,] = venn(validRequiredProps, givenProps);
    if (missingRequiredProps.size > 0) {
        throw new Error(`Plugin "${pluginConfig.name}" is missing required properties: ${printProps(missingRequiredProps)}`);
    }
    const nameType = typeof pluginConfig.name;
    if (nameType !== 'string') {
        throw new Error(`Plugin "${pluginConfig.name}" is giving an invalid value for property name: expected "string" type, got ${nameType} type`);
    }
    if (pluginConfig.name === '') {
        throw new Error(`Plugin "${pluginConfig.name}" is giving an invalid value for property name: empty string`);
    }
    const [, , invalidGivenProps] = venn(validProps, givenProps);
    if (invalidGivenProps.size > 0) {
        console.error(new Error(`Plugin "${pluginConfig.name}" is giving unexpected properties: ${printProps(invalidGivenProps)}`));
    }
    optionalPropFns.forEach((fnName) => {
        const fnType = typeof pluginConfig[fnName];
        if (fnType !== 'function' && fnType !== 'undefined') {
            console.error(new Error(`Plugin "${pluginConfig.name}" is giving an invalid value for ${fnName} hook: expected "function" type, got ${fnType} type`));
        }
    });
}
//# sourceMappingURL=plugin.js.map