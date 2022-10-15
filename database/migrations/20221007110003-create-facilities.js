/* eslint-disable no-unused-vars */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('facilities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      facilityCode: {
        type: Sequelize.STRING,
        field: 'facility_code',
      },
      facilityName: {
        type: Sequelize.STRING,
        field: 'facility_name',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at',
      },
      updatedAt: {
        allowNull: false,
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
    await queryInterface.dropTable('facilities');
  },
};
