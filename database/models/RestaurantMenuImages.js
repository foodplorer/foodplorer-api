const Sequelize = require('sequelize');
const Restaurants = require('./Restaurants');

module.exports = (sequelize, DataTypes) => {
  const RestaurantMenuImages = sequelize.define(
    'RestaurantMenuImages',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'image_url',
      },
      restaurantId: {
        type: DataTypes.INTEGER,
        field: 'restaurant_id',
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
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE,
        field: 'deleted_at',
      },
    },
    {
      tableName: 'restaurant_menu_images',
    }
  );
  RestaurantMenuImages.associate = (models) => {
    RestaurantMenuImages.belongsTo(models.Restaurants, {
      foreignKey: 'restaurant_id',
      as: 'restaurants',
    });
  };
  return RestaurantMenuImages;
};
