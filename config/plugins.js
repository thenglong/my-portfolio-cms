module.exports = {
  graphql: {
    config: {
      endpoint: "/graphql",
      shadowCRUD: true,
      playgroundAlways: false,
      depthLimit: 7,
      amountLimit: 100,
      apolloServer: {
        tracing: false,
      },
    },
  },
  'strapi-plugin-moesif': {
    enabled: true,
    config: {
      moesif: {
        //custom config passed to moesif middleware goes here
      }
    },
  },
};
