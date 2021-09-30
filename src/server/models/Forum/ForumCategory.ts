import { AllowNull, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

/* eslint-disable import/no-cycle */
import { ForumSection } from '@/server/models';
/* eslint-enable */

@Table({
  modelName: 'ForumCategory',
  tableName: 'ForumCategories',
})
export default class ForumCategory extends Model<ForumCategory> {
  @AllowNull(false)
  @Column(DataType.TEXT)
  title!: string;

  @HasMany(() => ForumSection)
  sections?: ForumSection[];
}
