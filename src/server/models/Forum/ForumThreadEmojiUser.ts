import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';

/* eslint-disable import/no-cycle */
import { ForumThreadEmoji, ForumUser } from '@/server/models';
/* eslint-enable */

@Table({
  modelName: 'ForumThreadEmojiUser',
  tableName: 'ForumThreadEmojiUsers',
})
export default class ForumThreadEmojiUser extends Model<ForumThreadEmojiUser> {
  @ForeignKey(() => ForumThreadEmoji)
  @Column(DataType.INTEGER)
  forumThreadEmojiId!: number;

  @ForeignKey(() => ForumUser)
  @Column(DataType.INTEGER)
  userId!: number;
}
