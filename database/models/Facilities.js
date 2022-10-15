const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Facilities = sequelize.define(
    'Facilities',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      facilityCode: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'facility_code',
      },
      facilityName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'facility_name',
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
      tableName: 'facilities',
    }
  );
  Facilities.associate = (models) => {
    Facilities.belongsToMany(models.Restaurants, {
      through: 'RestaurantsFacilities',
      as: 'restaurants',
      foreignKey: 'facility_id',
    });
  };
  return Facilities;
};
