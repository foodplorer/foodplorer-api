const Sequelize = require('sequelize');
const Restaurants = require('./Restaurants');
const Days = require('./Days');

module.exports = (sequelize, DataTypes) => {
  const RestaurantOperationalHours = sequelize.define(
    'RestaurantOperationalHours',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      clockInTime: {
        type: DataTypes.TIME,
        allowNull: true,
        field: 'clock_in_time',
      },
      clockOutTime: {
        type: DataTypes.TIME,
        allowNull: true,
        field: 'clock_out_time',
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
      dayId: {
        type: DataTypes.INTEGER,
        field: 'day_id',
        allowNull: false,
        references: {
          model: Days,
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
      tableName: 'restaurant_operational_hours',
    }
  );

  RestaurantOperationalHours.associate = (models) => {
    RestaurantOperationalHours.belongsTo(models.Restaurants, {
      foreignKey: 'restaurant_id',
      as: 'restaurants',
    });
    RestaurantOperationalHours.belongsTo(models.Days, {
      foreignKey: 'day_id',
      as: 'day',
    });
  };
  return RestaurantOperationalHours;
};
