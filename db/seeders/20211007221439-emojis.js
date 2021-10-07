module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('emojis', [
      {
        code: 'U+1F44D', // 👍
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        code: 'U+1F44E', // 👎
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('emojis', null, {});
  },
};
