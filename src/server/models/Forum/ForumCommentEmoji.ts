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
import { Emoji, ForumComment } from '@/server/models';
/* eslint-enable */

@Table({
  modelName: 'ForumCommentEmoji',
  tableName: 'ForumCommentEmojis',
})
export default class ForumCommentEmoji extends Model<ForumCommentEmoji> {
  @AllowNull(false)
  @Default(0)
  @Column(DataType.INTEGER)
  voteCount!: number;

  @ForeignKey(() => ForumComment)
  @Column(DataType.INTEGER)
  forumCommentId!: number;

  @ForeignKey(() => Emoji)
  @Column(DataType.INTEGER)
  emojiId!: number;
}
