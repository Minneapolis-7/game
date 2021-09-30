import {
  AllowNull,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

/* eslint-disable import/no-cycle */
import { Emoji, ForumThread } from '@/server/models';
/* eslint-enable */

@Table({
  modelName: 'ForumThreadEmoji',
  tableName: 'ForumThreadEmojis',
})
export default class ForumThreadEmoji extends Model<ForumThreadEmoji> {
  @AllowNull(false)
  @Default(0)
  @Column(DataType.INTEGER)
  voteCount!: number;

  @ForeignKey(() => ForumThread)
  @Column(DataType.INTEGER)
  forumThreadId!: number;

  @ForeignKey(() => Emoji)
  @Column(DataType.INTEGER)
  emojiId!: number;
}
