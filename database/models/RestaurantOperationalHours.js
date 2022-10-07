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
      clock_in_time: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      clock_out_time: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      restaurant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Restaurants,
          key: 'id',
        },
      },
      day_id: {
        type: DataTypes.INTEGER,
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
      deleted_at: {
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
    RestaurantOperationalHours.belongsToMany(models.Restaurant, {
      through: RestaurantOperationalHours,
    });
    RestaurantOperationalHours.belongsToMany(models.Days, {
      through: RestaurantOperationalHours,
    });
  };
  return RestaurantOperationalHours;
};
