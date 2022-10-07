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
      restaurant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Restaurants,
          key: 'id',
        },
      },
      facility_id: {
        type: DataTypes.INTEGER,
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
      deleted_at: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'restaurants_facilities',
    }
  );
  RestaurantsFacilities.associate = (models) => {
    RestaurantsFacilities.belongsToMany(models.Restaurants, {
      through: RestaurantsFacilities,
    });
    RestaurantsFacilities.belongsToMany(models.Facilities, {
      through: RestaurantsFacilities,
    });
  };
  return RestaurantsFacilities;
};
