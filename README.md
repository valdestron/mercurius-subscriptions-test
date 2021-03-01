Mercurius federation subscriptions test

Gateway 'api-gateway' and federated service 'auth' is based on fastify-gql (mercurius). Federated schema is builded using build-federated-schema script example. Type-graphql is used for typescript schema and resolvers.

To run:

1. `git clone`
2. `docker-compose up -d`
3. `yarn install && yarn build && yarn start`

To test the subscriptions in gateway:

1. go `http://localhost:8090/playground`
2. init subscription:
   `subscription { simpleSubscription { id message date } }`

3. init mutation:
   `mutation { simpleMutation(message:"1") }`

After subscription is closed you can do mutation again, the resolver is still receiving a message from pubsub.
