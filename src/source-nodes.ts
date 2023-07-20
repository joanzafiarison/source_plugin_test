import type { GatsbyNode, SourceNodesArgs, NodeInput, PluginOptions } from "gatsby";
import { fetchGraphQL, fetchGraphQLInstagramAccounts, fetchRickAndMorty } from "./utils";
import type { IAuthorInput, IPostInput, IpostInstagramInput, NodeBuilderInput, IPluginOptionsInternal } from "./types";
import { NODE_TYPES, ERROR_CODES, CACHE_KEYS } from "./constants"

//GatsbyNode type of gatsby Hook

export const sourceNodes : GatsbyNode[`sourceNodes`] = async (
    gatsbyApi, 
    pluginOptions : IPluginOptionsInternal 
) => {
    const { reporter, cache } = gatsbyApi; 
    console.log({pluginOptions})
    const { endpoint, instagram_user_id, instagram_user_name, access_token } = pluginOptions;

    interface IApiResponse {
        data: {
            posts : Array<IPostInput>
            authors : Array<IAuthorInput>
        }
        errors?: Array<{
            message : string
            locations: Array<unknown>
        }>
    }
    
    interface IApiRickAndMortyResponse {
        data : {
            results :{
                character :  {
                    name : string
                }
            }
        }
        errors?: Array<{
            message : string
            locations: Array<unknown>
        }>
    }
    
    interface IApiInstagramResponse { 
        business_discovery : {
                followers_count : number
                media_count : number 
                media : {
                    data : Array<IpostInstagramInput>
                }
        }
        id : number
        errors?: Array<{
            message : string
            locations: Array<unknown>
        }>
    }

    const sourcingTimer = reporter.activityTimer(`Sourcing from plugin API`);
    const lastFetchedDate: number = await cache.get(CACHE_KEYS.Timestamp)
    const lastFetchedDateCurrent = Date.now();
    reporter.verbose(`[plugin] Last fetched date: ${lastFetchedDate}`)
    sourcingTimer.start();
    
    const instaQuery = await fetchGraphQLInstagramAccounts<IApiInstagramResponse>(
        endpoint,
        `query InstaApi {
            business_discovery {
                followers_count
                media_count
            }
        }`,
        access_token,
        instagram_user_id,
        instagram_user_name,

    )
    
    const postQuery = await fetchGraphQL<IApiResponse>(
        "http://localhost:4000/graphql",
        `query FetchApi {
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
        `
    )

    //const rickMortyResponse = await fetchRickAndMorty<IApiRickAndMortyResponse>();
    
   //const { results = [] } = rickMortyResponse.data;
   //reporter.info(results[0].characters[0].name)
   const { data = [] } = instaQuery.business_discovery.media;
   reporter.info(data.length.toString()); //Object.keys(instaQuery).join(",")
   reporter.info(postQuery.data.posts[0].author.toString());
   const { authors =[] , posts = []} = postQuery.data

    sourcingTimer.setStatus(
        `Processing  post `
    );

    // validation d'une étape avant la construction des nodes
    if( postQuery.errors ) {
        reporter.info("erreur api"+postQuery.errors)
        sourcingTimer.panicOnBuild({
            id: ERROR_CODES.GraphQLSourcing,
            context: {
                sourceMessage: `Sourcing posts from the GraphQL API failed`,
                graphqlError: postQuery.errors[0].message,
            },
        });

        return 
    }
    
    if( instaQuery.errors ) {
        reporter.info('erreur insta api')
        sourcingTimer.panicOnBuild({
            id: ERROR_CODES.GraphQLSourcing,
            context: {
                sourceMessage:` Sourcing instagram posts from the Insta API failed`,
                graphqlError: instaQuery.errors[0].message
            }
        })
        return 
    }

    await cache.set(CACHE_KEYS.Timestamp, lastFetchedDateCurrent)
    
    for (const post of posts) {
        nodeBuilder({ gatsbyApi, input: { type: NODE_TYPES.Post, data: post} })
    }
    
    for (const author of authors) {
        nodeBuilder({ gatsbyApi, input: {type: NODE_TYPES.Author, data: author}})
    }
    
    for (const medium of data) {
        nodeBuilder({ gatsbyApi, input: { type: NODE_TYPES.NetworkPost, data : medium}})
    }

    sourcingTimer.end();
}

interface INodeBuilderArgs {
    gatsbyApi : SourceNodesArgs
    input : NodeBuilderInput
}

export function nodeBuilder({ gatsbyApi, input }: INodeBuilderArgs) {
    const id = gatsbyApi.createNodeId(`${input.type}-${input.data.id}`)

    const node = {
        ...input.data,
        id,
        _id : input.data.id,
        parent : null,
        children :[],
        internal: {
            type : input.type,
            contentDigest : gatsbyApi.createContentDigest(input.data),
        },
    } satisfies NodeInput 

    gatsbyApi.actions.createNode(node);
}