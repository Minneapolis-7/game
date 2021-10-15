module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('emojis', [
      {
        utf_code: '2764', // ❤
        html_entity_code: '10084',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        utf_code: '1F44D', // 👍
        html_entity_code: '128077',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        utf_code: '1F44E', // 👎
        html_entity_code: '128078',
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('emojis', null, {});
  },
};
