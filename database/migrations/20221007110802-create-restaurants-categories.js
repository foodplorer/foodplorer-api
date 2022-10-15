/* eslint-disable no-unused-vars */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('restaurants_categories', {
      restaurantId: {
        type: Sequelize.INTEGER,
        field: 'restaurant_id',
        references: {
          model: {
            tableName: 'restaurants',
          },
          key: 'id',
        },
      },
      categoryId: {
        type: Sequelize.INTEGER,
        field: 'category_id',
        references: {
          model: {
            tableName: 'categories',
          },
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at',
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        field: 'updated_at',
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('restaurants_categories');
  },
};
