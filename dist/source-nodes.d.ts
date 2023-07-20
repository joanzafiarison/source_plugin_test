import type { GatsbyNode, SourceNodesArgs } from "gatsby";
import type { NodeBuilderInput } from "./types";
export declare const sourceNodes: GatsbyNode[`sourceNodes`];
interface INodeBuilderArgs {
    gatsbyApi: SourceNodesArgs;
    input: NodeBuilderInput;
}
export declare function nodeBuilder({ gatsbyApi, input }: INodeBuilderArgs): void;
export {};
