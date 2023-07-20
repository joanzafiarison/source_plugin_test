"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSchemaCustomization = void 0;
const constants_1 = require("./constants");
let exemples_nodes = `
type ${constants_1.NODE_TYPES.Post} implements Node {
    id: ID!
    _id: Int!
    slug: String!
    title: String!
    author: ${constants_1.NODE_TYPES.Author} @link(by: "name")
    image: ${constants_1.NODE_TYPES.Post}Image!
}



type ${constants_1.NODE_TYPES.Author} implements Node {
    id: ID!
    _id : Int!
    name: String!
}

type ${constants_1.NODE_TYPES.Post}Image {
    url: String!
    alt: String!
    width: Int!
    height: Int!
}

type ${constants_1.NODE_TYPES.NetworkPost} implements Node {
    id : ID!
    followers_count : Int!
    media : ${constants_1.NODE_TYPES.NetworkPost}Media!

} 

type ${constants_1.NODE_TYPES.NetworkPost}Media {
    comments_count : Int!
    like_count : Int!
    timestamp : String! 
    username : String! 
    media_product_type : String! 
    media_url : String! 
    id : Int!
}
`;
const createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions;
    createTypes(exemples_nodes);
};
exports.createSchemaCustomization = createSchemaCustomization;
