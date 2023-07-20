"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onPluginInit = void 0;
const constants_1 = require("./constants");
const onPluginInit = ({ reporter }) => {
    reporter.setErrorMap({
        [constants_1.ERROR_CODES.GraphQLSourcing]: {
            text: (context) => `${context.sourceMessage}: ${context.graphqlError}`,
            level: `ERROR`,
            category: `THIRD_PARTY`
        }
    });
};
exports.onPluginInit = onPluginInit;
