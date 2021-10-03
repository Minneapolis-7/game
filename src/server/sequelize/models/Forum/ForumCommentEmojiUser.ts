import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';

/* eslint-disable import/no-cycle */
import { ForumCommentEmoji, User } from '@/server/sequelize/models';
/* eslint-enable */

@Table({
  underscored: true,
  modelName: 'ForumCommentEmojiUser',
})
export default class ForumCommentEmojiUser extends Model {
  @ForeignKey(() => ForumCommentEmoji)
  @Column(DataType.INTEGER)
  commentEmojiId!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number;
}
