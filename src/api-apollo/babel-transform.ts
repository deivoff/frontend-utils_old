import { toApolloPath, toFileName } from './api-apollo'

export const babelTransformApiApollo = () => ({
  'api/apollo/?(((\\w*)?/?)*)': {
    transform: (importName: string, matches: string[]) => {
      const targetName = toFileName(importName)
      const [rootFolder, file] = toApolloPath(matches[1])

      let path = ''

      if (rootFolder) {
        path += `/${rootFolder}`
      }

      path += `/${targetName}`

      if (file) {
        path += `/${file}`
      }

      return `api/apollo${path}`
    },
  },
})
