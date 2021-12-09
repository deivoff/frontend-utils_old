"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.babelTransformApiApollo = void 0;
var api_apollo_1 = require("./api-apollo");
var babelTransformApiApollo = function () { return ({
    'api/apollo/?(((\\w*)?/?)*)': {
        transform: function (importName, matches) {
            var targetName = (0, api_apollo_1.toFileName)(importName);
            var _a = (0, api_apollo_1.toApolloPath)(matches[1]), rootFolder = _a[0], file = _a[1];
            var path = '';
            if (rootFolder) {
                path += "/".concat(rootFolder);
            }
            path += "/".concat(targetName);
            if (file) {
                path += "/".concat(file);
            }
            return "api/apollo".concat(path);
        },
    },
}); };
exports.babelTransformApiApollo = babelTransformApiApollo;
