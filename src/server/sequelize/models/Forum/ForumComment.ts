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
import { Emoji, ForumCommentEmoji, ForumThread, User } from '@/server/sequelize/models';
import { IntrinsicModelAttributes } from '@/server/shared/types';
/* eslint-enable */

export type ForumCommentAttributes = {
  content: string;
  isModified: boolean;
  parentId: number;
  userId: number;
  threadId: number;
} & IntrinsicModelAttributes;

export type ForumCommentCreationAttributes = Optional<ForumCommentAttributes, 'isModified'>;

@Table({
  underscored: true,
  modelName: 'ForumComment',
  tableName: 'forum_comments',
})
export default class ForumComment extends Model<
  ForumCommentAttributes,
  ForumCommentCreationAttributes
> {
  @AllowNull(false)
  @Column(DataType.TEXT)
  content!: string;

  @AllowNull(false)
  @Default(false)
  @Column(DataType.BOOLEAN)
  isModified!: boolean;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  parentId!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number;

  @BelongsTo(() => User)
  user?: User;

  @ForeignKey(() => ForumThread)
  @Column(DataType.INTEGER)
  threadId!: number;

  @BelongsTo(() => ForumThread)
  thread?: ForumThread;

  @BelongsToMany(() => Emoji, () => ForumCommentEmoji)
  emojis!: Emoji[];

  @HasMany(() => ForumCommentEmoji, {
    onDelete: 'CASCADE',
  })
  commentEmojis?: ForumCommentEmoji[];
}
