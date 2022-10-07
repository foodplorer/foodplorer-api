const Sequelize = require('sequelize');
const Restaurants = require('./Restaurants');
const Categories = require('./Categories');

module.exports = (sequelize, DataTypes) => {
  const RestaurantsCategories = sequelize.define(
    'RestaurantsCategories',
    {
      restaurant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Restaurants,
          key: 'id',
        },
      },
      category_id: {
        type: DataTypes.INTEGER,
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
  RestaurantsCategories.associate = (models) => {
    RestaurantsCategories.belongsToMany(models.Restaurants, {
      through: RestaurantsCategories,
    });
    RestaurantsCategories.belongsToMany(models.Categories, {
      through: RestaurantsCategories,
    });
  };
  return RestaurantsCategories;
};
