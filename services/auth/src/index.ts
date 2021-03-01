import { bootstrapFederatedServer } from '@libs/federated-server'
import { FastifyRequest } from 'fastify'
import { HelloResolver } from './resolvers/Hello'
import { SubscriptionResolver } from './resolvers/Subscription'
import env from './utils/env'
import logger from './utils/logger'
import { WorkflowsSubscriptionResolver } from './resolvers/WorkflowsSubscription'
import { initPubSub } from './connectors/pubsub'
export type ServiceContext = FastifyRequest

const start = async () => {
  try {
    const pubSub = await initPubSub()
    const result = await bootstrapFederatedServer({
      schemaOpts: {
        resolvers: [HelloResolver, SubscriptionResolver, WorkflowsSubscriptionResolver],
        pubSub,
      },
      adapterOpts: {
        graphiql: 'playground',
        context: (request: FastifyRequest) =>
          ({
            ...request,
          } as ServiceContext),
        subscription: {
          pubsub: pubSub,
          onConnect: (data) => {
            console.log('on connect', data)
            return {
              hi: 'hi',
            }
          },
          onDisconnect: () => {
            console.log('on disconnect')
          },
        },
      },
      serverOpts: {
        port: env.PORT,
      },
    })

    logger.info(`up and running ${result}`)
  } catch (e) {
    logger.error(e)
  }
}

start()
