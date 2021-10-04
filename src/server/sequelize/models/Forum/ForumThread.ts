import { Optional } from 'sequelize';
import {
  AllowNull,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

/* eslint-disable import/no-cycle */
import {
  Emoji,
  ForumComment,
  ForumSection,
  ForumThreadEmoji,
  User,
} from '@/server/sequelize/models';
import { IntrinsicModelAttributes } from '@/server/shared/types';
/* eslint-enable */

export type ForumThreadAttributes = {
  title: string;
  content: string;
  isModified: boolean;
  visitedCounter: number;
  sectionId: number;
  userId: number;
} & IntrinsicModelAttributes;

export type ForumThreadCreationAttributes = Optional<
  ForumThreadAttributes,
  'isModified' | 'visitedCounter' | keyof IntrinsicModelAttributes
>;

@Table({
  underscored: true,
  modelName: 'ForumThread',
  tableName: 'forum_threads',
})
export default class ForumThread extends Model<
  ForumThreadAttributes,
  ForumThreadCreationAttributes
> {
  @AllowNull(false)
  @Column(DataType.TEXT)
  title!: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  content!: string;

  @AllowNull(false)
  @Default(false)
  @Column(DataType.BOOLEAN)
  isModified!: boolean;

  @AllowNull(false)
  @Default(0)
  @Column(DataType.INTEGER)
  visitedCounter!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => ForumSection)
  @Column(DataType.INTEGER)
  sectionId!: number;

  @BelongsTo(() => ForumSection)
  section!: ForumSection;

  @BelongsToMany(() => Emoji, () => ForumThreadEmoji)
  emojis!: Emoji[];

  @HasMany(() => ForumComment, {
    onDelete: 'CASCADE',
  })
  comments?: ForumComment[];

  @HasMany(() => ForumThreadEmoji, {
    onDelete: 'CASCADE',
  })
  threadEmojis?: ForumThreadEmoji[];
}
