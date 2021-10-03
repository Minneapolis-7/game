import { AllowNull, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

/* eslint-disable import/no-cycle */
import { ForumSection } from '@/server/sequelize/models';
/* eslint-enable */

export type ForumCategoryAttributes = {
  title: string;
};

@Table({
  underscored: true,
  modelName: 'ForumCategory',
})
export default class ForumCategory extends Model<ForumCategoryAttributes> {
  @AllowNull(false)
  @Column(DataType.TEXT)
  title!: string;

  @HasMany(() => ForumSection)
  sections?: ForumSection[];
}
