/* eslint-disable no-unused-vars */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('restaurant_operational_hours', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      clockInTime: {
        type: Sequelize.TIME,
        field: 'clock_in_time',
      },
      clockOutTime: {
        type: Sequelize.TIME,
        field: 'clock_out_time',
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
      dayId: {
        type: Sequelize.INTEGER,
        field: 'day_id',
        references: {
          model: {
            tableName: 'days',
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
      deletedAt: {
        type: Sequelize.DATE,
        field: 'deleted_at',
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('restaurant_operational_hours');
  },
};
