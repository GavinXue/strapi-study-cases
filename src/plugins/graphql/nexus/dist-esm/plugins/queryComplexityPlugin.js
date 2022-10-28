import { plugin } from '../plugin';
import { printedGenTyping, printedGenTypingImport } from '../utils';
const QueryComplexityImport = printedGenTypingImport({
    module: 'nexus/dist/plugins/queryComplexityPlugin',
    bindings: ['QueryComplexity'],
});
const fieldDefTypes = printedGenTyping({
    optional: true,
    name: 'complexity',
    description: `
    The complexity for an individual field. Return a number
    or a function that returns a number to specify the
    complexity for this field.
  `,
    type: 'QueryComplexity<TypeName, FieldName>',
    imports: [QueryComplexityImport],
});
export const queryComplexityPlugin = () => {
    return plugin({
        name: 'query-complexity',
        description: `
      The query complexity plugin allows defining field-level complexity values that
      works with the graphql-query-complexity library.
    `,
        fieldDefTypes,
        onCreateFieldResolver(config) {
            var _a, _b, _c, _d;
            // Look for complexity property defined in the nexus config
            const complexity = (_b = (_a = config.fieldConfig.extensions) === null || _a === void 0 ? void 0 : _a.nexus) === null || _b === void 0 ? void 0 : _b.config.complexity;
            // Skip if field doesn't have complexity property
            if (complexity == null) {
                return;
            }
            // If the complexity is not a number or a function that returns a number, provide a warning
            if (typeof complexity !== 'number' && typeof complexity !== 'function') {
                const parentName = config.parentTypeConfig.name;
                const fieldName = (_d = (_c = config.fieldConfig.extensions) === null || _c === void 0 ? void 0 : _c.nexus) === null || _d === void 0 ? void 0 : _d.config.name;
                console.error(new Error(`The complexity property provided to ${parentName}.${fieldName} should be a number or a function that returns a number, saw ${typeof complexity}`));
                return;
            }
            // Mutate the field config's extensions property with new complexity field.
            // graphql-query-complexity will look for this property to estimate complexity
            config.fieldConfig.extensions = Object.assign(Object.assign({}, config.fieldConfig.extensions), { complexity });
            return undefined;
        },
    });
};
//# sourceMappingURL=queryComplexityPlugin.js.map