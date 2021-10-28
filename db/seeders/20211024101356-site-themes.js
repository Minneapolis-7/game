module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('site_themes', [
      {
        name: 'default',
        description: 'Default site theme',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        name: 'halloween',
        description: 'Happy halloween!',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    ]);
  },

  down: async (queryInterface) => {
    queryInterface.delete('site_themes', null, {});
  },
};
