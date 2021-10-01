import {
  AllowNull,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

/* eslint-disable import/no-cycle */
import { Emoji, ForumCommentEmoji, ForumThread, ForumUser } from '@/server/models';
/* eslint-enable */

@Table({
  modelName: 'ForumComment',
  tableName: 'ForumComments',
})
export default class ForumComment extends Model<ForumComment> {
  @AllowNull(false)
  @Column(DataType.TEXT)
  content!: string;

  @AllowNull(false)
  @Default(false)
  @Column(DataType.BOOLEAN)
  isModified!: boolean;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  parentId!: number;

  @ForeignKey(() => ForumUser)
  @Column(DataType.INTEGER)
  userId!: number;

  @BelongsTo(() => ForumUser)
  user?: ForumUser;

  @ForeignKey(() => ForumThread)
  @Column(DataType.INTEGER)
  threadId!: number;

  @BelongsTo(() => ForumThread)
  thread?: ForumThread;

  @BelongsToMany(() => Emoji, () => ForumCommentEmoji)
  emojis!: Emoji[];
}
