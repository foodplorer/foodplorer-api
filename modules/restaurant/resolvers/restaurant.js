const { UserInputError, ApolloError } = require('apollo-server-express');
const { Op } = require('sequelize');
const models = require('../../../database/models');

const {
  maxPageSizeValidation,
  setPage,
} = require('../../../middleware/pagination/pageSizeValidation');

module.exports = {
  Query: {
    restaurantList: async (
      _,
      { pageSize = 10, page = 0, search = '', filter }
    ) => {
      maxPageSizeValidation(pageSize);
      const offset = setPage(pageSize, page);
      const applyCategoryIdsFilter = filter?.categoryIds;
      const applyExcludeRestaurantId = filter?.excludeRestaurantId;

      let whereClause;

      let categoryFilter = {
        deletedAt: {
          [Op.is]: null,
        },
      };

      if (search?.length <= 0 || filter.categoryIds?.length === 0) {
        whereClause = {
          deletedAt: {
            [Op.is]: null,
          },
        };
      }

      if (applyExcludeRestaurantId) {
        whereClause = {
          deletedAt: {
            [Op.is]: null,
          },
          id: {
            [Op.ne]: applyExcludeRestaurantId,
          },
        };
      }

      if (search.length > 0) {
        whereClause = {
          deletedAt: {
            [Op.is]: null,
          },
          name: {
            [Op.iLike]: `%${search}%`,
          },
        };
      }

      if (filter) {
        if (applyCategoryIdsFilter?.length > 0) {
          categoryFilter = {
            deletedAt: {
              [Op.is]: null,
            },
            '$categories.id$': { [Op.in]: filter?.categoryIds },
          };
        }
      }

      try {
        const restaurants = await models.Restaurants.findAll({
          where: whereClause,
          order: [
            ['created_at', 'DESC'],
            [
              {
                model: models.RestaurantOperationalHours,
                as: 'restaurantOperationalHours',
              },
              'dayId',
              'ASC',
            ],
          ],
          limit: pageSize,
          offset,
          include: [
            {
              model: models.RestaurantImages,
              as: 'restaurantImages',
              required: true,
              where: {
                deletedAt: {
                  [Op.is]: null,
                },
              },
            },
            {
              model: models.RestaurantMenuImages,
              as: 'restaurantMenuImages',
              required: false,
              where: {
                deletedAt: {
                  [Op.is]: null,
                },
              },
            },
            {
              model: models.Categories,
              as: 'categories',
              required: false,
              where: categoryFilter,
            },
            {
              model: models.Facilities,
              as: 'facilities',
              required: false,
            },
            {
              model: models.RestaurantOperationalHours,
              as: 'restaurantOperationalHours',
              required: false,
              where: {
                deletedAt: {
                  [Op.is]: null,
                },
              },
              include: [
                {
                  model: models.Days,
                  as: 'day',
                  required: false,
                },
              ],
            },
          ],
        });

        let count = await models.Restaurants.count({
          where: {
            deletedAt: {
              [Op.is]: null,
            },
          },
        });

        if (search.length > 0) {
          count = await models.Restaurants.count({
            where: whereClause,
          });
        }

        let getAllRestaurants = await restaurants.map((restaurant) => ({
          id: restaurant.id,
          name: restaurant.name,
          slug: restaurant.slug,
          address: restaurant.address,
          mainImageUrl: restaurant.mainImageUrl,
          ...restaurant,
          createdAt: restaurant.createdAt,
          updatedAt: restaurant.updatedAt,
          deletedAt: restaurant.deletedAt,
        }));

        if (applyCategoryIdsFilter) {
          getAllRestaurants = await restaurants.filter(
            (restaurant) => restaurant.categories.length > 0
          );
          count = getAllRestaurants.length;
        }

        const metaData = {
          pageSize,
          currentPage: page,
          total: count,
          totalPage: Math.ceil(count / pageSize),
        };

        return await {
          restaurants: getAllRestaurants,
          meta: metaData,
        };
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    restaurantDetail: async (_, { id }) => {
      try {
        const restaurant = await models.Restaurants.findByPk(id, {
          order: [
            [
              {
                model: models.RestaurantOperationalHours,
                as: 'restaurantOperationalHours',
              },
              'dayId',
              'ASC',
            ],
          ],
          include: [
            {
              model: models.RestaurantImages,
              as: 'restaurantImages',
              required: true,
              where: {
                deletedAt: {
                  [Op.is]: null,
                },
              },
            },
            {
              model: models.RestaurantMenuImages,
              as: 'restaurantMenuImages',
              required: false,
              where: {
                deletedAt: {
                  [Op.is]: null,
                },
              },
            },
            {
              model: models.Categories,
              as: 'categories',
              required: false,
            },
            {
              model: models.Facilities,
              as: 'facilities',
              required: false,
            },
            {
              model: models.RestaurantOperationalHours,
              as: 'restaurantOperationalHours',
              required: false,
              where: {
                deletedAt: {
                  [Op.is]: null,
                },
              },
              include: [
                {
                  model: models.Days,
                  as: 'day',
                  required: false,
                },
              ],
            },
          ],
        });

        if (restaurant === null || restaurant.deletedAt !== null) {
          throw new UserInputError('Restaurant not found');
        }

        return restaurant;
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    getRestaurantBySlug: async (_, { slug }) => {
      try {
        const restaurant = await models.Restaurants.findOne({
          where: { slug },
          order: [
            [
              {
                model: models.RestaurantOperationalHours,
                as: 'restaurantOperationalHours',
              },
              'dayId',
              'ASC',
            ],
          ],
          include: [
            {
              model: models.RestaurantImages,
              as: 'restaurantImages',
              required: true,
              where: {
                deletedAt: {
                  [Op.is]: null,
                },
              },
            },
            {
              model: models.RestaurantMenuImages,
              as: 'restaurantMenuImages',
              required: false,
              where: {
                deletedAt: {
                  [Op.is]: null,
                },
              },
            },
            {
              model: models.Categories,
              as: 'categories',
              required: false,
            },
            {
              model: models.Facilities,
              as: 'facilities',
              required: false,
            },
            {
              model: models.RestaurantOperationalHours,
              as: 'restaurantOperationalHours',
              required: false,
              where: {
                deletedAt: {
                  [Op.is]: null,
                },
              },
              include: [
                {
                  model: models.Days,
                  as: 'day',
                  required: false,
                },
              ],
            },
          ],
        });

        if (restaurant === null || restaurant.deletedAt !== null) {
          throw new UserInputError('Restaurant not found');
        }

        return restaurant;
      } catch (error) {
        throw new ApolloError(error);
      }
    },
  },
};
