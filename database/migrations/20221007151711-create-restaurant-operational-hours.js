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
      clock_in_time: {
        type: Sequelize.TIME,
      },
      clock_out_time: {
        type: Sequelize.TIME,
      },
      restaurant_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'restaurants',
          },
          key: 'id',
        },
      },
      day_id: {
        type: Sequelize.INTEGER,
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
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('restaurant_operational_hours');
  },
};
