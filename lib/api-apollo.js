"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toApolloPath = exports.toFilePath = exports.toQueryName = exports.toFileName = void 0;
var lodash_1 = require("lodash");
var FOLDERS = ['queries', 'mutations', 'subscriptions'];
var toFileName = function (str) { return (0, lodash_1.upperFirst)((0, lodash_1.camelCase)(str)); };
exports.toFileName = toFileName;
var toQueryName = function (str) { return (0, lodash_1.toUpper)((0, lodash_1.snakeCase)(str)); };
exports.toQueryName = toQueryName;
var toFilePath = function (folder) {
    if (FOLDERS.some(function (v) { return v === folder; })) {
        return 'query.gql';
    }
    if (folder === 'policies') {
        return 'index';
    }
    if (folder === 'fragments') {
        return 'fragment.gql';
    }
    return '';
};
exports.toFilePath = toFilePath;
var toApolloPath = function (folder) {
    if (folder) {
        var rootFolder = folder;
        var file = (0, exports.toFilePath)(folder);
        return [rootFolder, file];
    }
    return ['', ''];
};
exports.toApolloPath = toApolloPath;
