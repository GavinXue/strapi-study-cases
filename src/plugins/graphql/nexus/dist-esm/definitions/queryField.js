import { extendType } from './extendType';
export function queryField(...args) {
    return extendType({
        type: 'Query',
        definition(t) {
            if (typeof args[0] === 'function') {
                return args[0](t);
            }
            const [fieldName, config] = args;
            const finalConfig = typeof config === 'function' ? config() : config;
            t.field(fieldName, finalConfig);
        },
    });
}
//# sourceMappingURL=queryField.js.map