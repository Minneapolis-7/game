import {
  AllowNull,
  Column,
  DataType,
  Default,
  HasMany,
  Index,
  Model,
  Table,
} from 'sequelize-typescript';

/* eslint-disable import/no-cycle */
import { ForumComment, ForumThread } from '@/server/models';
/* eslint-enable */

@Table({
  modelName: 'ForumUser',
  tableName: 'ForumUsers',
})
export default class ForumUser extends Model<ForumUser> {
  @AllowNull(false)
  @Index
  @Column(DataType.INTEGER)
  yandexUserId!: number;

  @AllowNull(false)
  @Column(DataType.TEXT)
  firstName!: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  secondName!: string;

  @Column(DataType.TEXT)
  displayName?: string;

  @Column(DataType.TEXT)
  avatarUrl?: string;

  @AllowNull(false)
  @Default(false)
  @Column(DataType.BOOLEAN)
  isOnline!: boolean;

  @HasMany(() => ForumComment)
  comments?: ForumComment[];

  @HasMany(() => ForumThread)
  threads?: ForumThread[];
}
