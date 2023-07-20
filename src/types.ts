import { NODE_TYPES } from "./constants";

// Création d'un type nodeBuilder avec les types définis ci-dessous
// lie un type a une interface
export type NodeBuilderInput = 
  | { type: typeof NODE_TYPES.Author; data: IAuthorInput}
  | { type: typeof NODE_TYPES.Post; data: IPostInput}
  | { type: typeof NODE_TYPES.NetworkPost; data: IpostInstagramInput}


import type { PluginOptions as GatsbyDefaultPluginOptions, IPluginRefOptions } from "gatsby"

export interface IAuthorInput {
  id: number
  name: string
}


export interface IPostImageInput {
  url: string
  alt: string
  width: number
  height: number
}

export interface IPostInput {
  id: number
  slug: string
  title: string
  image: IPostImageInput
  author: string
}

export interface IpostInstagramInput {
  comments_count : number
  like_count : number 
  timestamp : string 
  username : string 
  media_product_type : string 
  media_url : string 
  id : string
}

interface IPluginOptionsKeys {
  // TODO: Set your plugin options here
  endpoint : string,
  message : string,
  instagram_user_id : number,
  instagram_user_name : string,
  access_token : string
}


/**
 * Gatsby expects the plugin options to be of type "PluginOptions" for gatsby-node APIs (e.g. sourceNodes)
 */
export interface IPluginOptionsInternal extends IPluginOptionsKeys, GatsbyDefaultPluginOptions {}

/**
 * These are the public TypeScript types for consumption in gatsby-config
 */
export interface IPluginOptions extends IPluginOptionsKeys, IPluginRefOptions {}
