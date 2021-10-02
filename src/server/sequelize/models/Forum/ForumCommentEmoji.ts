import {
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

/* eslint-disable import/no-cycle */
import { Emoji, ForumComment, ForumCommentEmojiUser, User } from '@/server/sequelize/models';
/* eslint-enable */

@Table({
  underscored: true,
  modelName: 'ForumCommentEmoji',
})
export default class ForumCommentEmoji extends Model<ForumCommentEmoji> {
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => ForumComment)
  @Column(DataType.INTEGER)
  commentId!: number;

  @ForeignKey(() => Emoji)
  @Column(DataType.INTEGER)
  emojiId!: number;

  @BelongsToMany(() => User, () => ForumCommentEmojiUser)
  users!: User[];
}
