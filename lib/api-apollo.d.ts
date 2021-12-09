export declare const toFileName: (str: string) => string;
export declare const toQueryName: (str: string) => string;
export declare const toFilePath: (folder: string) => "" | "query.gql" | "index" | "fragment.gql";
export declare const toApolloPath: (folder?: string | undefined) => string[];
