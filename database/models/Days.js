const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Days = sequelize.define(
    'Days',
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
      tableName: 'days',
    }
  );
  Days.associate = (models) => {
    Days.hasMany(models.RestaurantOperationalHours, {
      foreignKey: 'day_id',
      as: 'restaurantOperationalHours',
    });
  };
  return Days;
};
