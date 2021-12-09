export declare const babelTransformApiApollo: () => {
    'api/apollo/?(((\\w*)?/?)*)': {
        transform: (importName: string, matches: string[]) => string;
    };
};
