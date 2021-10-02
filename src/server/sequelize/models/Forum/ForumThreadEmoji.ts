import {
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

/* eslint-disable import/no-cycle */
import { Emoji, ForumThread, ForumThreadEmojiUser, User } from '@/server/sequelize/models';
/* eslint-enable */

@Table({
  underscored: true,
  modelName: 'ForumThreadEmoji',
})
export default class ForumThreadEmoji extends Model<ForumThreadEmoji> {
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => ForumThread)
  @Column(DataType.INTEGER)
  threadId!: number;

  @ForeignKey(() => Emoji)
  @Column(DataType.INTEGER)
  emojiId!: number;

  @BelongsToMany(() => User, () => ForumThreadEmojiUser)
  users!: User[];
}
