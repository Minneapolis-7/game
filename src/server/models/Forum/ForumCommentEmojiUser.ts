import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';

/* eslint-disable import/no-cycle */
import { ForumCommentEmoji, ForumUser } from '@/server/models';
/* eslint-enable */

@Table({
  modelName: 'ForumCommentEmojiUser',
  tableName: 'ForumCommentEmojiUsers',
})
export default class ForumCommentEmojiUser extends Model<ForumCommentEmojiUser> {
  @ForeignKey(() => ForumCommentEmoji)
  @Column(DataType.INTEGER)
  forumCommentEmojiId!: number;

  @ForeignKey(() => ForumUser)
  @Column(DataType.INTEGER)
  userId!: number;
}
