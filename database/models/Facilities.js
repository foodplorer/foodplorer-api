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
      facility_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      facility_name: {
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
      tableName: 'facilities',
    }
  );
  return Facilities;
};
