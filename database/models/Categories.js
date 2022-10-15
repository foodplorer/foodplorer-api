const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define(
    'Categories',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      categoryCode: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'category_code',
      },
      categoryName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'category_name',
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
      tableName: 'categories',
    }
  );
  Categories.associate = (models) => {
    Categories.belongsToMany(models.Restaurants, {
      through: 'RestaurantsCategories',
      as: 'restaurants',
      foreignKey: 'category_id',
    });
  };
  return Categories;
};
