import { Optional } from 'sequelize';
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

/* eslint-disable import/no-cycle */
import { ForumCommentEmoji, User } from '@/server/sequelize/models';
import { IntrinsicModelAttributes } from '@/server/shared/types';
/* eslint-enable */

export type ForumCommentEmojiUserAttributes = {
  userId: number;
  commentEmojiId: number;
} & IntrinsicModelAttributes;

export type ForumCommentEmojiUserACreationAttributes = Optional<
  ForumCommentEmojiUserAttributes,
  keyof IntrinsicModelAttributes
>;

@Table({
  underscored: true,
  modelName: 'ForumCommentEmojiUser',
  tableName: 'forum_comment_emoji_users',
})
export default class ForumCommentEmojiUser extends Model<
  ForumCommentEmojiUserAttributes,
  ForumCommentEmojiUserACreationAttributes
> {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => ForumCommentEmoji)
  @Column(DataType.INTEGER)
  commentEmojiId!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number;

  @BelongsTo(() => ForumCommentEmoji)
  commentEmoji?: ForumCommentEmoji;

  @BelongsTo(() => User)
  user?: User;
}
