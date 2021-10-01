import { BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';

/* eslint-disable import/no-cycle */
import { Emoji, ForumThread, ForumThreadEmojiUser, ForumUser } from '@/server/models';
/* eslint-enable */

@Table({
  modelName: 'ForumThreadEmoji',
  tableName: 'ForumThreadEmojis',
})
export default class ForumThreadEmoji extends Model<ForumThreadEmoji> {
  @ForeignKey(() => ForumThread)
  @Column(DataType.INTEGER)
  forumThreadId!: number;

  @ForeignKey(() => Emoji)
  @Column(DataType.INTEGER)
  emojiId!: number;

  @BelongsToMany(() => ForumUser, () => ForumThreadEmojiUser)
  users!: ForumUser[];
}
