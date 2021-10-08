const fs = require('fs');

const { forum: txt } = JSON.parse(fs.readFileSync('src/shared/lang/ru_RU.json', 'utf-8'));

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // todo: https://github.com/sequelize/sequelize/issues/8444
    const categoriesText = Object.values(txt.categories);
    const categoriesIds = await queryInterface.bulkInsert(
      'forum_categories',
      categoriesText.map((category) => ({
        title: category.header,
        created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      })),
      { returning: ['id'] }
    );
    const sections = [];

    categoriesIds.forEach(({ id }, i) => {
      Object.values(categoriesText[i].sections).forEach((sectionText) => {
        const { description, header: title } = sectionText;

        sections.push({
          category_id: id,
          title,
          description,
          created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
          updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        });
      });
    });
    await queryInterface.bulkInsert('forum_sections', sections);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('forum_sections', null, {});
    await queryInterface.bulkDelete('forum_categories', null, {});
  },
};
