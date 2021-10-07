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
import { ForumCategory, ForumThread } from '@/server/sequelize/models';
import { IntrinsicModelAttributes } from '@/server/shared/types';
/* eslint-enable */

export type ForumSectionAttributes = {
  title: string;
  description: string;
  categoryId: number;
} & IntrinsicModelAttributes;

@Table({
  underscored: true,
  modelName: 'ForumSection',
  tableName: 'forum_sections',
})
export default class ForumSection extends Model<ForumSectionAttributes> {
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
