const Sequelize = require('sequelize');
const Restaurants = require('./Restaurants');

module.exports = (sequelize, DataTypes) => {
  const RestaurantImages = sequelize.define(
    'RestaurantImages',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      restaurant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Restaurants,
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
      deleted_at: {
        allowNull: true,
        type: DataTypes.DATE,
        field: 'deleted_at',
      },
    },
    {
      tableName: 'restaurant_images',
    }
  );
  RestaurantImages.associate = (models) => {
    RestaurantImages.belongsTo(models.Restaurants, {
      foreignKey: 'restaurant_id',
      as: 'restaurants',
    });
  };
  return RestaurantImages;
};
