"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fieldAuthorizePlugin = exports.defaultFormatError = void 0;
const plugin_1 = require("../plugin");
const utils_1 = require("../utils");
const FieldauthorizeResolverImport = utils_1.printedGenTypingImport({
    module: 'nexus/dist/plugins/fieldAuthorizePlugin',
    bindings: ['FieldAuthorizeResolver'],
});
const fieldDefTypes = utils_1.printedGenTyping({
    optional: true,
    name: 'authorize',
    description: `
    Authorization for an individual field. Returning "true"
    or "Promise<true>" means the field can be accessed.
    Returning "false" or "Promise<false>" will respond
    with a "Not Authorized" error for the field. 
    Returning or throwing an error will also prevent the 
    resolver from executing.
  `,
    type: 'FieldAuthorizeResolver<TypeName, FieldName>',
    imports: [FieldauthorizeResolverImport],
});
const defaultFormatError = ({ error }) => {
    const err = new Error('Not authorized');
    err.originalError = error;
    return err;
};
exports.defaultFormatError = defaultFormatError;
const fieldAuthorizePlugin = (authConfig = {}) => {
    const { formatError = exports.defaultFormatError } = authConfig;
    const ensureError = (root, args, ctx, info) => (error) => {
        const finalErr = formatError({ error, root, args, ctx, info });
        if (finalErr instanceof Error) {
            throw finalErr;
        }
        console.error(`Non-Error value ${finalErr} returned from custom formatError in authorize plugin`);
        throw new Error('Not authorized');
    };
    let hasWarned = false;
    return plugin_1.plugin({
        name: 'NexusAuthorize',
        description: 'The authorize plugin provides field-level authorization for a schema.',
        fieldDefTypes: fieldDefTypes,
        onCreateFieldResolver(config) {
            var _a, _b, _c;
            const authorize = (_b = (_a = config.fieldConfig.extensions) === null || _a === void 0 ? void 0 : _a.nexus) === null || _b === void 0 ? void 0 : _b.config.authorize;
            // If the field doesn't have an authorize field, don't worry about wrapping the resolver
            if (authorize == null) {
                return;
            }
            // If it does have this field, but it's not a function, it's wrong - let's provide a warning
            if (typeof authorize !== 'function') {
                console.error(new Error(`The authorize property provided to ${config.fieldConfig.name} with type ${config.fieldConfig.type} should be a function, saw ${typeof authorize}`));
                return;
            }
            // If they have it, but didn't explicitly specify a plugins array, warn them.
            if (!((_c = config.schemaConfig.plugins) === null || _c === void 0 ? void 0 : _c.find((p) => p.config.name === 'NexusAuthorize'))) {
                if (!hasWarned) {
                    console.warn('The GraphQL Nexus "authorize" feature has been moved to a plugin, add [fieldAuthorizePlugin()] to your makeSchema plugin config to remove this warning.');
                    hasWarned = true;
                }
            }
            // The authorize wrapping resolver.
            return function (root, args, ctx, info, next) {
                let toComplete;
                try {
                    toComplete = authorize(root, args, ctx, info);
                }
                catch (e) {
                    toComplete = Promise.reject(e);
                }
                return plugin_1.plugin.completeValue(toComplete, (authResult) => {
                    if (authResult === true) {
                        return next(root, args, ctx, info);
                    }
                    const finalFormatError = ensureError(root, args, ctx, info);
                    if (authResult instanceof Error) {
                        finalFormatError(authResult);
                    }
                    if (authResult === false) {
                        finalFormatError(new Error('Not authorized'));
                    }
                    const { fieldName, parentType: { name: parentTypeName }, } = info;
                    finalFormatError(new Error(`Nexus authorize for ${parentTypeName}.${fieldName} Expected a boolean or Error, saw ${authResult}`));
                }, (err) => {
                    ensureError(root, args, ctx, info)(err);
                });
            };
        },
    });
};
exports.fieldAuthorizePlugin = fieldAuthorizePlugin;
//# sourceMappingURL=fieldAuthorizePlugin.js.map