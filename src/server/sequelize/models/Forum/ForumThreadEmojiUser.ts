import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';

/* eslint-disable import/no-cycle */
import { ForumThreadEmoji, User } from '@/server/sequelize/models';
import { IntrinsicModelAttributes } from '@/server/shared/types';
/* eslint-enable */

export type ForumThreadEmojiUserAttributes = {
  userId: number;
  // ???
} & IntrinsicModelAttributes;

@Table({
  underscored: true,
  modelName: 'ForumThreadEmojiUser',
})
export default class ForumThreadEmojiUser extends Model<ForumThreadEmojiUserAttributes> {
  @ForeignKey(() => ForumThreadEmoji)
  @Column(DataType.INTEGER)
  threadEmojiId!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number;
}
