import { get } from 'env-var'

const Config = {
  name: get('NAME_SERVICE').default('bots-placement').asString(),
  logLevel: get('LOGLEVEL').default('info').asEnum([
    'info',
    'fatal',
    'error',
    'warn',
    'debug',
    'trace',
  ]),
  movingWay: get('MOVING_WAY').required().asBool(),
  formation: get('FORMATION').default('start').asString(),
}

export default Config
