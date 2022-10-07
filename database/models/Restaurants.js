const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Restaurants = sequelize.define(
    'Restaurants',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      main_image_url: {
        type: DataTypes.STRING,
        allowNull: false,
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
      tableName: 'restaurants',
    }
  );
  Restaurants.associate = (models) => {
    Restaurants.hasMany(models.RestaurantImages, {
      foreignKey: 'restaurant_id',
      as: 'restaurant_images',
    });
    Restaurants.hasMany(models.RestaurantMenuImages, {
      foreignKey: 'restaurant_id',
      as: 'restaurant_menu_images',
    });
  };
  return Restaurants;
};
