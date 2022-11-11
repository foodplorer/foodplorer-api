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
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        defaultValue: 'slug-test',
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mainImageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'main_image_url',
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
      tableName: 'restaurants',
    }
  );
  Restaurants.associate = (models) => {
    Restaurants.hasMany(models.RestaurantImages, {
      foreignKey: 'restaurant_id',
      as: 'restaurantImages',
    });
    Restaurants.hasMany(models.RestaurantMenuImages, {
      foreignKey: 'restaurant_id',
      as: 'restaurantMenuImages',
    });
    Restaurants.hasMany(models.RestaurantOperationalHours, {
      foreignKey: 'restaurant_id',
      as: 'restaurantOperationalHours',
    });

    Restaurants.belongsToMany(models.Facilities, {
      through: 'RestaurantsFacilities',
      as: 'facilities',
      foreignKey: 'restaurant_id',
    });
    Restaurants.belongsToMany(models.Categories, {
      through: 'RestaurantsCategories',
      as: 'categories',
      foreignKey: 'restaurant_id',
    });
  };
  return Restaurants;
};
