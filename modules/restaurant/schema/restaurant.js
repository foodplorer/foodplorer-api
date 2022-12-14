const { gql } = require('apollo-server-express');

module.exports = gql`
  scalar Date
  scalar timetz

  type Restaurant {
    id: Int!
    name: String!
    address: String!
    slug: String!
    mainImageUrl: String!
    categories: [RestaurantCategory]
    facilities: [RestaurantFacility]
    restaurantMenuImages: [RestaurantMenuImages]!
    restaurantImages: [RestaurantImages]!
    restaurantOperationalHours: [RestaurantOperationalHours]
    createdAt: Date!
    updatedAt: Date
    deletedAt: Date
  }

  type RestaurantListData {
    restaurants: [Restaurant]
    meta: MetaData
  }

  type MetaData {
    currentPage: Int
    pageSize: Int
    total: Int
    totalPage: Int
  }

  input RestaurantFilterInput {
    categoryIds: [ID]
  }

  extend type Query {
    restaurantList(
      page: Int
      pageSize: Int
      search: String
      filter: RestaurantFilterInput
    ): RestaurantListData
    restaurantDetail(id: ID!): Restaurant
    getRestaurantBySlug(slug: String!): Restaurant
  }

  type RestaurantMenuImages {
    id: Int!
    imageUrl: String!
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
  }

  type RestaurantImages {
    id: Int!
    imageUrl: String!
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
  }

  type RestaurantOperationalHours {
    id: Int!
    clockInTime: timetz
    clockOutTime: timetz
    day: Day
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
  }

  type Day {
    id: Int!
    name: String
    operationalHours: RestaurantOperationalHours
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
  }

  type RestaurantCategory {
    id: Int!
    categoryCode: String
    categoryName: String
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
  }

  type RestaurantFacility {
    id: Int!
    facilityCode: String
    facilityName: String
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
  }
`;
