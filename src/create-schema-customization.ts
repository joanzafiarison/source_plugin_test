import type { GatsbyNode } from "gatsby"; 
import { NODE_TYPES } from "./constants";

let exemples_nodes = `
type ${NODE_TYPES.Post} implements Node {
    id: ID!
    _id: Int!
    slug: String!
    title: String!
    author: ${NODE_TYPES.Author} @link(by: "name")
    image: ${NODE_TYPES.Post}Image!
}



type ${NODE_TYPES.Author} implements Node {
    id: ID!
    _id : Int!
    name: String!
}

type ${NODE_TYPES.Post}Image {
    url: String!
    alt: String!
    width: Int!
    height: Int!
}

type ${NODE_TYPES.NetworkPost} implements Node {
    id : ID!
    followers_count : Int!
    media : ${NODE_TYPES.NetworkPost}Media!

} 

type ${NODE_TYPES.NetworkPost}Media {
    comments_count : Int!
    like_count : Int!
    timestamp : String! 
    username : String! 
    media_product_type : String! 
    media_url : String! 
    id : Int!
}
`


export const createSchemaCustomization: GatsbyNode[`createSchemaCustomization`] = 
    ({ actions }) => {
        const { createTypes } = actions
        createTypes(exemples_nodes)
    }
