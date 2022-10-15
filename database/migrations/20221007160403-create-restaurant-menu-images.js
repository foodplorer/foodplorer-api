/* eslint-disable no-unused-vars */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('restaurant_menu_images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'image_url',
      },
      restaurantId: {
        type: Sequelize.INTEGER,
        field: 'restaurant_id',
        references: {
          model: 'restaurants',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at',
      },
      deletedAt: {
        type: Sequelize.DATE,
        field: 'deleted_at',
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('restaurant_menu_images');
  },
};
