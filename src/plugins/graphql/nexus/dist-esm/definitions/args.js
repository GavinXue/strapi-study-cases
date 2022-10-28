import { NexusTypes, withNexusSymbol } from './_types';
export class NexusArgDef {
    constructor(name, config) {
        this.name = name;
        this.config = config;
    }
    get value() {
        return this.config;
    }
}
withNexusSymbol(NexusArgDef, NexusTypes.Arg);
/**
 * [API Docs](https://nexusjs.org/docs/api/args) | [GraphQL.org
 * Docs](https://graphql.github.io/learn/schema/#arguments) | [GraphQL 2018
 * Spec](https://spec.graphql.org/June2018/#sec-Language.Arguments)
 *
 * Define an argument. Arguments can be used with the args config of any field.
 *
 * @example
 *   export const Mutation = mutationType({
 *     definition(t) {
 *       t.field('createDraft', {
 *         type: 'Post',
 *         args: {
 *           title: arg({
 *             type: 'String',
 *             default: 'Untitled',
 *             description: 'The title of this draft post.',
 *           }),
 *           body: nonNull(
 *             arg({
 *               type: 'String',
 *               description: 'The content of this draft post.',
 *             })
 *           ),
 *         },
 *         // ...
 *       })
 *     },
 *   })
 *
 * @param config Configuration for the argument like its type and description. See jsdoc on each config field
 *   for details.
 */
export function arg(config) {
    if (!config.type) {
        throw new Error('You must provide a "type" for the arg()');
    }
    return new NexusArgDef(typeof config.type === 'string' ? config.type : config.type.name, config);
}
/**
 * [API Docs](https://nexusjs.org/docs/api/args) | [GraphQL.org
 * Docs](https://graphql.github.io/learn/schema/#arguments) | [GraphQL 2018
 * Spec](https://spec.graphql.org/June2018/#sec-Language.Arguments)
 *
 * Define a string argument. Arguments can be used with the args config of any field.
 *
 * This is a shorthand equivalent to:
 *
 * `arg({ type: 'String', ... })`
 *
 * @example
 *   export const Mutation = mutationType({
 *     definition(t) {
 *       t.field('createDraft', {
 *         type: 'Post',
 *         args: {
 *           title: stringArg(),
 *           body: stringArg(),
 *         },
 *         // ...
 *       })
 *     },
 *   })
 *
 * @param config Configuration for the argument like its description. See jsdoc on each config field for details.
 */
export function stringArg(config) {
    return arg(Object.assign({ type: 'String' }, config));
}
/**
 * [API Docs](https://nexusjs.org/docs/api/args) | [GraphQL.org
 * Docs](https://graphql.github.io/learn/schema/#arguments) | [GraphQL 2018
 * Spec](https://spec.graphql.org/June2018/#sec-Language.Arguments)
 *
 * Define a string argument. Arguments can be used with the args config of any field.
 *
 * This is a shorthand equivalent to:
 *
 * `arg({ type: 'Int', ... })`
 *
 * @example
 *   export const Query = queryType({
 *     definition(t) {
 *       t.field('search', {
 *         type: 'SearchResult',
 *         args: {
 *           maxResults: intArg(),
 *         },
 *         // ...
 *       })
 *     },
 *   })
 *
 * @param config Configuration for the argument like its description. See jsdoc on each config field for details.
 */
export function intArg(config) {
    return arg(Object.assign({ type: 'Int' }, config));
}
/**
 * [API Docs](https://nexusjs.org/docs/api/args) | [GraphQL.org
 * Docs](https://graphql.github.io/learn/schema/#arguments) | [GraphQL 2018
 * Spec](https://spec.graphql.org/June2018/#sec-Language.Arguments)
 *
 * Define a string argument. Arguments can be used with the args config of any field.
 *
 * This is a shorthand equivalent to:
 *
 * `arg({ type: 'Float', ... })`
 *
 * @example
 *   export const Query = queryType({
 *     definition(t) {
 *       t.field('search', {
 *         type: 'SearchResult',
 *         args: {
 *           ratingAbove: floatArg(),
 *         },
 *         // ...
 *       })
 *     },
 *   })
 *
 * @param config Configuration for the argument like its description. See jsdoc on each config field for details.
 */
export function floatArg(config) {
    return arg(Object.assign({ type: 'Float' }, config));
}
/**
 * [API Docs](https://nexusjs.org/docs/api/args) | [GraphQL.org
 * Docs](https://graphql.github.io/learn/schema/#arguments) | [GraphQL 2018
 * Spec](https://spec.graphql.org/June2018/#sec-Language.Arguments)
 *
 * Define a string argument. Arguments can be used with the args config of any field.
 *
 * This is a shorthand equivalent to:
 *
 * `arg({ type: 'ID', ... })`
 *
 * @example
 *   export const Query = queryType({
 *     definition(t) {
 *       t.field('user', {
 *         type: 'User',
 *         args: {
 *           id: idArg(),
 *         },
 *         // ...
 *       })
 *     },
 *   })
 *
 * @param config Configuration for the argument like its description. See jsdoc on each config field for details.
 */
export function idArg(config) {
    return arg(Object.assign({ type: 'ID' }, config));
}
/**
 * [API Docs](https://nexusjs.org/docs/api/args) | [GraphQL.org
 * Docs](https://graphql.github.io/learn/schema/#arguments) | [GraphQL 2018
 * Spec](https://spec.graphql.org/June2018/#sec-Language.Arguments)
 *
 * Define a string argument. Arguments can be used with the args config of any field.
 *
 * This is a shorthand equivalent to:
 *
 * `arg({ type: 'Boolean', ... })`
 *
 * @example
 *   export const Query = queryType({
 *     definition(t) {
 *       t.list.field('users', {
 *         type: 'User',
 *         args: {
 *           active: booleanArg(),
 *         },
 *         // ...
 *       })
 *     },
 *   })
 *
 * @param config Configuration for the argument like its description. See jsdoc on each config field for details.
 */
export function booleanArg(config) {
    return arg(Object.assign({ type: 'Boolean' }, config));
}
//# sourceMappingURL=args.js.map