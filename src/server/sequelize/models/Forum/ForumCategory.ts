import { AllowNull, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

/* eslint-disable import/no-cycle */
import { ForumSection } from '@/server/sequelize/models';
import { IntrinsicModelAttributes } from '@/server/shared/types';
/* eslint-enable */

export type ForumCategoryAttributes = {
  title: string;
} & IntrinsicModelAttributes;

@Table({
  underscored: true,
  modelName: 'ForumCategory',
  tableName: 'forum_categories',
})
export default class ForumCategory extends Model<ForumCategoryAttributes> {
  @AllowNull(false)
  @Column(DataType.TEXT)
  title!: string;

  @HasMany(() => ForumSection, {
    // todo: не работает каскадное удаление из-за сидинга данных в базу
    // https://github.com/sequelize/sequelize/issues/8444
    onDelete: 'CASCADE',
  })
  sections?: ForumSection[];
}
