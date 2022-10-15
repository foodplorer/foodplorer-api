const { gql } = require('apollo-server-express');

const restaurantType = require('../../modules/restaurant/schema/restaurant');

const rootType = gql`
  type Query {
    root: String
  }

  type Mutation {
    root: String
  }
`;

module.exports = [rootType, restaurantType];
