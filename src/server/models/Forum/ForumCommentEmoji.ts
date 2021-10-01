import { BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';

/* eslint-disable import/no-cycle */
import { Emoji, ForumComment, ForumCommentEmojiUser, ForumUser } from '@/server/models';
/* eslint-enable */

@Table({
  modelName: 'ForumCommentEmoji',
  tableName: 'ForumCommentEmojis',
})
export default class ForumCommentEmoji extends Model<ForumCommentEmoji> {
  @ForeignKey(() => ForumComment)
  @Column(DataType.INTEGER)
  forumCommentId!: number;

  @ForeignKey(() => Emoji)
  @Column(DataType.INTEGER)
  emojiId!: number;

  @BelongsToMany(() => ForumUser, () => ForumCommentEmojiUser)
  users!: ForumUser[];
}
