import fetch, { HeadersInit } from "node-fetch"

const headers = {
  "Content-Type": `application/json`,
} satisfies HeadersInit

/**
 * Fetch utility for requests to the example api.
 * You can use a GraphQL client module instead if you prefer a more full-featured experience.
 * @see https://graphql.org/code/#javascript-client
 */
export async function fetchGraphQL<T>(endpoint: string, query: string): Promise<T> {
  const response = await fetch(endpoint, {
    method: `POST`,
    headers,
    body: JSON.stringify({
      query,
    }),
  })
  
  return await response.json();
 
}

export async function fetchRickAndMorty<T>() : Promise<T> {
  const response = await fetch('https://rickandmortyapi.com/graphql', {
    method : "POST",
    headers,
    body : JSON.stringify({
      query : `{
        characters {
          results {
            name
          }
        }
      }`
    })
  })

  return  await response.json()
}

export async function fetchGraphQLInstagramAccounts<T>(endpoint: string, query : string, access_token: string, instagram_user_id : number, instagram_user_name : string):Promise<T> {
  let endpoint_accounts = endpoint + `${instagram_user_id}?fields=business_discovery.username(${instagram_user_name}){followers_count,media_count,media{id_caption,comments_count,like_count,timestamp,username,media_product_type,media_type,owner_permalink,media_url}}&access_token=${access_token}`;
  console.log("insta endpoint", endpoint_accounts);
  const response = await fetch(endpoint_accounts, {
      method: 'GET',
      headers,
      }
     )
  return await response.json()
}
