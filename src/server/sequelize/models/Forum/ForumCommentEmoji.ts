import {
  AllowNull,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

/* eslint-disable import/no-cycle */
import { Emoji, ForumComment, ForumCommentEmojiUser, User } from '@/server/sequelize/models';
import { IntrinsicModelAttributes } from '@/server/shared/types';
/* eslint-enable */

export type ForumCommentEmojiAttributes = {
  commentId: number;
  emojiId: number;
} & IntrinsicModelAttributes;

@Table({
  underscored: true,
  modelName: 'ForumCommentEmoji',
})
export default class ForumCommentEmoji extends Model<ForumCommentEmojiAttributes> {
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => ForumComment)
  @Column(DataType.INTEGER)
  commentId!: number;

  @ForeignKey(() => Emoji)
  @Column(DataType.INTEGER)
  emojiId!: number;

  @BelongsTo(() => ForumComment)
  comment?: ForumComment;

  @BelongsTo(() => Emoji)
  emoji?: Emoji;

  @BelongsToMany(() => User, () => ForumCommentEmojiUser)
  users!: User[];

  @HasMany(() => ForumCommentEmojiUser)
  commentEmojiUsers?: ForumCommentEmojiUser[];
}
