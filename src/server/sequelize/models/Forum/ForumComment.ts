import { Optional } from 'sequelize';
import {
  AllowNull,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

/* eslint-disable import/no-cycle */
import { Emoji, ForumCommentEmoji, ForumThread, User } from '@/server/sequelize/models';
/* eslint-enable */

export type ForumCommentAttributes = {
  content: string;
  isModified: boolean;
  parentId: number;
};

export type ForumCommentCreationAttributes = Optional<ForumCommentAttributes, 'isModified'>;

@Table({
  underscored: true,
  modelName: 'ForumComment',
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
}
