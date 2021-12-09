import { upperFirst, camelCase, snakeCase, toUpper } from 'lodash'

const FOLDERS = ['queries', 'mutations', 'subscriptions']

export const toFileName = (str: string) => upperFirst(camelCase(str))
export const toQueryName = (str: string) => toUpper(snakeCase(str))
export const toFilePath = (folder: string) => {
  if (FOLDERS.some((v) => v === folder)) {
    return 'query.gql'
  }

  if (folder === 'policies') {
    return 'index'
  }

  if (folder === 'fragments') {
    return 'fragment.gql'
  }

  return ''
}
export const toApolloPath = (folder?: string) => {
  if (folder) {
    const rootFolder = folder
    const file = toFilePath(folder)

    return [rootFolder, file]
  }

  return ['', '']
}
