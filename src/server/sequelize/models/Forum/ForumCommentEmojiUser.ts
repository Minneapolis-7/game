import {
  AllowNull,
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

@Table({
  underscored: true,
  modelName: 'ForumCommentEmojiUser',
})
export default class ForumCommentEmojiUser extends Model<ForumCommentEmojiUserAttributes> {
  @PrimaryKey
  @AllowNull(false)
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
