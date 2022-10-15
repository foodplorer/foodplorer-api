/* eslint-disable no-unused-vars */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('restaurants_facilities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
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
      facilityId: {
        type: Sequelize.INTEGER,
        field: 'facility_id',
        references: {
          model: {
            tableName: 'facilities',
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
      deleted_at: {
        type: Sequelize.DATE,
        field: 'deleted_at',
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('restaurants_facilities');
  },
};
