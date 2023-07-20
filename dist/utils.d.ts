/**
 * Fetch utility for requests to the example api.
 * You can use a GraphQL client module instead if you prefer a more full-featured experience.
 * @see https://graphql.org/code/#javascript-client
 */
export declare function fetchGraphQL<T>(endpoint: string, query: string): Promise<T>;
export declare function fetchRickAndMorty<T>(): Promise<T>;
export declare function fetchGraphQLInstagramAccounts<T>(endpoint: string, query: string, access_token: string, instagram_user_id: number, instagram_user_name: string): Promise<T>;
