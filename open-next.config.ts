import type { OpenNextConfig } from '@opennextjs/cloudflare'

const config: OpenNextConfig = {
  default: {
    override: {
      wrapper: 'cloudflare-node-compat',
      queue: 'cloudflare',
      kvObject: 'cloudflare',
    },
  },
  dangerous: {
    useLocalDevelopmentServer: false,
  },
}

export default config
