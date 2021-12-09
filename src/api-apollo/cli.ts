import { promises as fs } from 'fs'
import { join } from 'path'
import { toFileName, toFilePath, toQueryName } from './api-apollo'

const API_FOLDER_NAME = 'src/api/apollo'
const FOLDER_DICT: Record<string, string> = {
  q: 'queries',
  f: 'fragments',
  m: 'mutations',
  s: 'subscriptions',
}

const QUERY_DICT: Record<string, string> = {
  q: 'query',
  f: 'fragment',
  m: 'mutation',
  s: 'subscription',
}

const [, parserPath, type, name] = process.argv
const folderName = FOLDER_DICT[type]

if (!folderName) {
  throw Error(
    `Not found type! (${Object.entries(FOLDER_DICT)
      .map(([k, v]) => `${k} => ${v}`)
      .join(', ')})`
  )
}

const moduleName = toFileName(name)
const rootPath = join(parserPath, '../../..', API_FOLDER_NAME)

const file = toFilePath(folderName)
const queryName = toQueryName(name)

// templates
const INDEX_TEMPLATE = `export { default as ${queryName} } from './${file}';
export * from './types/${moduleName}';`
const TYPES_TEMPLATE = `export interface ${moduleName} {}
`
const EXTENDS_TEMPLATE = `export * from './${moduleName}';`
const QUERY_TEMPLATE = `${QUERY_DICT[type]} ${moduleName} {
}`

const pathToExtends = join(rootPath, folderName)

const pathToModuleFolder = join(pathToExtends, moduleName)
const pathToModuleIndex = join(pathToModuleFolder, 'index')
const pathToModuleGQL = join(pathToModuleFolder, file)

const pathToTypesFolder = join(pathToModuleFolder, 'types')
const pathToTypesFile = join(pathToModuleFolder, 'types', moduleName)

;(async function createModule() {
  try {
    await fs.mkdir(pathToModuleFolder)
    console.log(`The dir ${moduleName} was created!`)
    await fs.mkdir(pathToTypesFolder)
    console.log(`The types dir for ${moduleName} was created!`)

    await fs.writeFile(`${pathToTypesFile}.ts`, TYPES_TEMPLATE)
    console.log(`The types file for ${moduleName} was created!`)

    await fs.writeFile(`${pathToModuleIndex}.ts`, INDEX_TEMPLATE)
    console.log(`The index file for ${moduleName} was created!`)

    await fs.writeFile(`${pathToModuleGQL}`, QUERY_TEMPLATE)
    console.log(`The ${file} file for ${moduleName} was created!`)

    const indexPath = join(pathToExtends, 'index.ts')
    const indexFile = await fs.readFile(indexPath, 'utf8')
    const importsStrings = indexFile.split('\n').filter(Boolean)
    importsStrings.push(EXTENDS_TEMPLATE)
    await fs.writeFile(indexPath, importsStrings.sort().join('\n') + '\n')
    console.log(`The ${moduleName} was appended to ${folderName}!`)
  } catch (err) {
    throw err
  }
})()
