import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';

/* eslint-disable import/no-cycle */
import { ForumCommentEmoji, User } from '@/server/sequelize/models';
/* eslint-enable */

export type ForumCommentEmojiUserAttributes = {
  userId: number;
  // ???
};

@Table({
  underscored: true,
  modelName: 'ForumCommentEmojiUser',
})
export default class ForumCommentEmojiUser extends Model<ForumCommentEmojiUserAttributes> {
  @ForeignKey(() => ForumCommentEmoji)
  @Column(DataType.INTEGER)
  commentEmojiId!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number;
}
