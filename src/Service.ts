/* eslint-disable object-shorthand */
import { promises as fsPromises } from 'fs'

import { PlacementMessage } from '@nodetron/types/bots/placement'
import {
  Service,
  ServiceBroker,
  Context,
} from 'moleculer'

import Config from './Config'

export default class BotsPlacementService extends Service {
  public constructor(public broker: ServiceBroker) {
    super(broker)
    this.parseServiceSchema({
      name: Config.name,
      dependencies: ['bots'],
      async started() {
        BotsPlacementService.changeFormation(Config.formation, broker)
      },
      actions: {
        place: {
          params: {
            formation: { type: 'string' },
          },
          handler(ctx: Context<{ formation: string }>): void {
            BotsPlacementService.changeFormation(ctx.params.formation, broker)
          },
        },
      },
    })
  }

  public static changeFormation(path: string, broker: ServiceBroker): void {
    fsPromises.readFile(`./formations/${path}.json`, 'utf8')
      .then((str: string) => <PlacementMessage>JSON.parse(str))
      .then((data: PlacementMessage) => {
        if (Config.movingWay) {
          broker.logger.debug('TODO')
        } else {
          void broker.call('bots.placement', data)
        }
      }).catch((err: Error) => {
        broker.logger.error('File read failed:', err)
      })
  }
}
