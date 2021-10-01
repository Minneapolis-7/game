import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

/* eslint-disable import/no-cycle */
import { ForumCategory, ForumThread } from '@/server/models';
/* eslint-enable */

@Table({
  modelName: 'ForumSection',
  tableName: 'ForumSections',
})
export default class ForumSection extends Model<ForumSection> {
  @AllowNull(false)
  @Column(DataType.TEXT)
  title!: string;

  @Column(DataType.TEXT)
  description!: string;

  @ForeignKey(() => ForumCategory)
  @Column(DataType.INTEGER)
  categoryId!: number;

  @BelongsTo(() => ForumCategory)
  category?: ForumCategory;

  @HasMany(() => ForumThread)
  threads?: ForumThread[];
}
