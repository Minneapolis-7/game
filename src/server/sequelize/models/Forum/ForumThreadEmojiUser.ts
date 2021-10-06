import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

/* eslint-disable import/no-cycle */
import { ForumThreadEmoji, User } from '@/server/sequelize/models';
import { IntrinsicModelAttributes } from '@/server/shared/types';
/* eslint-enable */

export type ForumThreadEmojiUserAttributes = {
  userId: number;
  threadEmojiId: number;
} & IntrinsicModelAttributes;

@Table({
  underscored: true,
  modelName: 'ForumThreadEmojiUser',
})
export default class ForumThreadEmojiUser extends Model<ForumThreadEmojiUserAttributes> {
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => ForumThreadEmoji)
  @Column(DataType.INTEGER)
  threadEmojiId!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number;

  @BelongsTo(() => ForumThreadEmoji)
  threadEmoji?: ForumThreadEmoji;

  @BelongsTo(() => User)
  user?: User;
}
