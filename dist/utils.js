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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchGraphQLInstagramAccounts = exports.fetchRickAndMorty = exports.fetchGraphQL = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const headers = {
    "Content-Type": `application/json`,
};
/**
 * Fetch utility for requests to the example api.
 * You can use a GraphQL client module instead if you prefer a more full-featured experience.
 * @see https://graphql.org/code/#javascript-client
 */
function fetchGraphQL(endpoint, query) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield (0, node_fetch_1.default)(endpoint, {
            method: `POST`,
            headers,
            body: JSON.stringify({
                query,
            }),
        });
        return yield response.json();
    });
}
exports.fetchGraphQL = fetchGraphQL;
function fetchRickAndMorty() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield (0, node_fetch_1.default)('https://rickandmortyapi.com/graphql', {
            method: "POST",
            headers,
            body: JSON.stringify({
                query: `{
        characters {
          results {
            name
          }
        }
      }`
            })
        });
        return yield response.json();
    });
}
exports.fetchRickAndMorty = fetchRickAndMorty;
function fetchGraphQLInstagramAccounts(endpoint, query, access_token, instagram_user_id, instagram_user_name) {
    return __awaiter(this, void 0, void 0, function* () {
        let endpoint_accounts = endpoint + `${instagram_user_id}?fields=business_discovery.username(${instagram_user_name}){followers_count,media_count,media{id_caption,comments_count,like_count,timestamp,username,media_product_type,media_type,owner_permalink,media_url}}&access_token=${access_token}`;
        console.log("insta endpoint", endpoint_accounts);
        const response = yield (0, node_fetch_1.default)(endpoint_accounts, {
            method: 'GET',
            headers,
        });
        return yield response.json();
    });
}
exports.fetchGraphQLInstagramAccounts = fetchGraphQLInstagramAccounts;
