"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeBuilder = exports.sourceNodes = void 0;
const utils_1 = require("./utils");
const constants_1 = require("./constants");
//GatsbyNode type of gatsby Hook
const sourceNodes = (gatsbyApi, pluginOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { reporter, cache } = gatsbyApi;
    console.log({ pluginOptions });
    const { endpoint, instagram_user_id, instagram_user_name, access_token } = pluginOptions;
    const sourcingTimer = reporter.activityTimer(`Sourcing from plugin API`);
    const lastFetchedDate = yield cache.get(constants_1.CACHE_KEYS.Timestamp);
    const lastFetchedDateCurrent = Date.now();
    reporter.verbose(`[plugin] Last fetched date: ${lastFetchedDate}`);
    sourcingTimer.start();
    const instaQuery = yield (0, utils_1.fetchGraphQLInstagramAccounts)(endpoint, `query InstaApi {
            business_discovery {
                followers_count
                media_count
            }
        }`, access_token, instagram_user_id, instagram_user_name);
    const postQuery = yield (0, utils_1.fetchGraphQL)("http://localhost:4000/graphql", `query FetchApi {
            posts {
                id
                slug
                title
                image {
                    url
                    alt 
                    width
                    height
                }
                author
            }
            authors {
                id
                name
            }
        }
        `);
    //const rickMortyResponse = await fetchRickAndMorty<IApiRickAndMortyResponse>();
    //const { results = [] } = rickMortyResponse.data;
    //reporter.info(results[0].characters[0].name)
    const { data = [] } = instaQuery.business_discovery.media;
    reporter.info(data.length.toString()); //Object.keys(instaQuery).join(",")
    reporter.info(postQuery.data.posts[0].author.toString());
    const { authors = [], posts = [] } = postQuery.data;
    sourcingTimer.setStatus(`Processing  post `);
    // validation d'une étape avant la construction des nodes
    if (postQuery.errors) {
        reporter.info("erreur api" + postQuery.errors);
        sourcingTimer.panicOnBuild({
            id: constants_1.ERROR_CODES.GraphQLSourcing,
            context: {
                sourceMessage: `Sourcing posts from the GraphQL API failed`,
                graphqlError: postQuery.errors[0].message,
            },
        });
        return;
    }
    if (instaQuery.errors) {
        reporter.info('erreur insta api');
        sourcingTimer.panicOnBuild({
            id: constants_1.ERROR_CODES.GraphQLSourcing,
            context: {
                sourceMessage: ` Sourcing instagram posts from the Insta API failed`,
                graphqlError: instaQuery.errors[0].message
            }
        });
        return;
    }
    yield cache.set(constants_1.CACHE_KEYS.Timestamp, lastFetchedDateCurrent);
    for (const post of posts) {
        nodeBuilder({ gatsbyApi, input: { type: constants_1.NODE_TYPES.Post, data: post } });
    }
    for (const author of authors) {
        nodeBuilder({ gatsbyApi, input: { type: constants_1.NODE_TYPES.Author, data: author } });
    }
    for (const medium of data) {
        nodeBuilder({ gatsbyApi, input: { type: constants_1.NODE_TYPES.NetworkPost, data: medium } });
    }
    sourcingTimer.end();
});
exports.sourceNodes = sourceNodes;
function nodeBuilder({ gatsbyApi, input }) {
    const id = gatsbyApi.createNodeId(`${input.type}-${input.data.id}`);
    const node = Object.assign(Object.assign({}, input.data), { id, _id: input.data.id, parent: null, children: [], internal: {
            type: input.type,
            contentDigest: gatsbyApi.createContentDigest(input.data),
        } });
    gatsbyApi.actions.createNode(node);
}
exports.nodeBuilder = nodeBuilder;
