module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('user_themes', [
      {
        user_id: 5,
        theme_id: 1,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    ]);
  },

  down: async (queryInterface) => {
    queryInterface.delete('user_themes', null, {});
  },
};
