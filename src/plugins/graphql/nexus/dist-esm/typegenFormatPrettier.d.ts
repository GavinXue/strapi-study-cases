export declare type TypegenFormatFn = (content: string, type: 'types' | 'schema') => string | Promise<string>;
export declare function typegenFormatPrettier(prettierConfig: string | object): TypegenFormatFn;
