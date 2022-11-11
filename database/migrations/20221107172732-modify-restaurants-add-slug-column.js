const { QueryTypes } = require('sequelize');

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface
      .addColumn('restaurants', 'slug', {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        defaultValue: 'slug-test',
      })
      .then(() => {
        queryInterface.sequelize
          .query(`SELECT id from restaurants`, {
            type: QueryTypes.SELECT,
          })
          .then((rows) => {
            rows.map((row) => {
              queryInterface.sequelize.query(
                `UPDATE restaurants SET slug=replace(lower(restaurants.name), ' ', '-') WHERE id=${row.id};`
              );
            });
            Promise.resolve();
          })
          .then(() => {
            queryInterface.changeColumn('restaurants', 'slug', {
              type: Sequelize.STRING,
              allowNull: false,
            });
          });
      }),
  down: async (queryInterface) => {
    await queryInterface.removeColumn('restaurants', 'slug');
  },
};
