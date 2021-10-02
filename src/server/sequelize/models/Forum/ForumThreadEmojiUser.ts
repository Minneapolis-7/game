import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';

/* eslint-disable import/no-cycle */
import { ForumThreadEmoji, User } from '@/server/sequelize/models';
/* eslint-enable */

@Table({
  underscored: true,
  modelName: 'ForumThreadEmojiUser',
})
export default class ForumThreadEmojiUser extends Model<ForumThreadEmojiUser> {
  @ForeignKey(() => ForumThreadEmoji)
  @Column(DataType.INTEGER)
  threadEmojiId!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number;
}
