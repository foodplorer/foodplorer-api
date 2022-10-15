const Sequelize = require('sequelize');
const Restaurants = require('./Restaurants');
const Facilities = require('./Facilities');

module.exports = (sequelize, DataTypes) => {
  const RestaurantsFacilities = sequelize.define(
    'RestaurantsFacilities',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
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
      facilityId: {
        type: DataTypes.INTEGER,
        field: 'facility_id',
        allowNull: false,
        references: {
          model: Facilities,
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
        type: DataTypes.DATE,
        field: 'deleted_at',
      },
    },
    {
      tableName: 'restaurants_facilities',
    }
  );
  return RestaurantsFacilities;
};
