const Sequelize = require('sequelize');
const Restaurants = require('./Restaurants');
const Categories = require('./Categories');

module.exports = (sequelize, DataTypes) => {
  const RestaurantsCategories = sequelize.define(
    'RestaurantsCategories',
    {
      restaurantId: {
        type: DataTypes.INTEGER,
        field: 'restaurant_id',
        allowNull: false,
        references: {
          model: Restaurants,
          key: 'id',
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        field: 'category_id',
        allowNull: false,
        references: {
          model: Categories,
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        field: 'created_at',
      },
      updatedAt: {
        allowNull: true,
        type: DataTypes.DATE,
        field: 'updated_at',
      },
    },
    {
      tableName: 'restaurants_categories',
    }
  );
  return RestaurantsCategories;
};
