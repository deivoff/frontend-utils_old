#!/usr/bin/env_node
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var api_apollo_1 = require("./api-apollo");
var API_FOLDER_NAME = 'src/api/apollo';
var FOLDER_DICT = {
    q: 'queries',
    f: 'fragments',
    m: 'mutations',
    s: 'subscriptions',
};
var QUERY_DICT = {
    q: 'query',
    f: 'fragment',
    m: 'mutation',
    s: 'subscription',
};
var _a = process.argv, parserPath = _a[1], type = _a[2], name = _a[3];
var folderName = FOLDER_DICT[type];
if (!folderName) {
    throw Error("Not found type! (".concat(Object.entries(FOLDER_DICT)
        .map(function (_a) {
        var k = _a[0], v = _a[1];
        return "".concat(k, " => ").concat(v);
    })
        .join(', '), ")"));
}
var moduleName = (0, api_apollo_1.toFileName)(name);
var rootPath = (0, path_1.join)(parserPath, '../../..', API_FOLDER_NAME);
var file = (0, api_apollo_1.toFilePath)(folderName);
var queryName = (0, api_apollo_1.toQueryName)(name);
// templates
var INDEX_TEMPLATE = "export { default as ".concat(queryName, " } from './").concat(file, "';\nexport * from './types/").concat(moduleName, "';");
var TYPES_TEMPLATE = "export interface ".concat(moduleName, " {}\n");
var EXTENDS_TEMPLATE = "export * from './".concat(moduleName, "';");
var QUERY_TEMPLATE = "".concat(QUERY_DICT[type], " ").concat(moduleName, " {\n}");
var pathToExtends = (0, path_1.join)(rootPath, folderName);
var pathToModuleFolder = (0, path_1.join)(pathToExtends, moduleName);
var pathToModuleIndex = (0, path_1.join)(pathToModuleFolder, 'index');
var pathToModuleGQL = (0, path_1.join)(pathToModuleFolder, file);
var pathToTypesFolder = (0, path_1.join)(pathToModuleFolder, 'types');
var pathToTypesFile = (0, path_1.join)(pathToModuleFolder, 'types', moduleName);
(function createModule() {
    return __awaiter(this, void 0, void 0, function () {
        var indexPath, indexFile, importsStrings, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    return [4 /*yield*/, fs_1.promises.mkdir(pathToModuleFolder)];
                case 1:
                    _a.sent();
                    console.log("The dir ".concat(moduleName, " was created!"));
                    return [4 /*yield*/, fs_1.promises.mkdir(pathToTypesFolder)];
                case 2:
                    _a.sent();
                    console.log("The types dir for ".concat(moduleName, " was created!"));
                    return [4 /*yield*/, fs_1.promises.writeFile("".concat(pathToTypesFile, ".ts"), TYPES_TEMPLATE)];
                case 3:
                    _a.sent();
                    console.log("The types file for ".concat(moduleName, " was created!"));
                    return [4 /*yield*/, fs_1.promises.writeFile("".concat(pathToModuleIndex, ".ts"), INDEX_TEMPLATE)];
                case 4:
                    _a.sent();
                    console.log("The index file for ".concat(moduleName, " was created!"));
                    return [4 /*yield*/, fs_1.promises.writeFile("".concat(pathToModuleGQL), QUERY_TEMPLATE)];
                case 5:
                    _a.sent();
                    console.log("The ".concat(file, " file for ").concat(moduleName, " was created!"));
                    indexPath = (0, path_1.join)(pathToExtends, 'index.ts');
                    return [4 /*yield*/, fs_1.promises.readFile(indexPath, 'utf8')];
                case 6:
                    indexFile = _a.sent();
                    importsStrings = indexFile.split('\n').filter(Boolean);
                    importsStrings.push(EXTENDS_TEMPLATE);
                    return [4 /*yield*/, fs_1.promises.writeFile(indexPath, importsStrings.sort().join('\n') + '\n')];
                case 7:
                    _a.sent();
                    console.log("The ".concat(moduleName, " was appended to ").concat(folderName, "!"));
                    return [3 /*break*/, 9];
                case 8:
                    err_1 = _a.sent();
                    throw err_1;
                case 9: return [2 /*return*/];
            }
        });
    });
})();
