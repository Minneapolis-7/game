import { Optional } from 'sequelize';
import {
  AllowNull,
  BelongsToMany,
  Column,
  DataType,
  Default,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

/* eslint-disable import/no-cycle */
import {
  ForumComment,
  ForumCommentEmoji,
  ForumCommentEmojiUser,
  ForumThread,
  ForumThreadEmoji,
  ForumThreadEmojiUser,
} from '@/server/sequelize/models';
import UnderscoredIndex from '@/server/sequelize/utils/UnderscoredIndex';
import { IntrinsicModelAttributes } from '@/server/shared/types';
/* eslint-enable */

export type UserAttributes = {
  yandexUserId: number;
  firstName: string;
  secondName: string;
  displayName: string;
  avatarUrl: string;
  isOnline: boolean;
} & IntrinsicModelAttributes;

export type UserCreationAttributes = Optional<
  UserAttributes,
  'displayName' | 'avatarUrl' | 'isOnline'
>;

@Table({
  underscored: true,
  modelName: 'User',
})
export default class User extends Model<UserAttributes, UserCreationAttributes> {
  @AllowNull(false)
  @UnderscoredIndex
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

  @BelongsToMany(() => ForumCommentEmoji, () => ForumCommentEmojiUser)
  commentEmojis!: ForumCommentEmoji[];

  @BelongsToMany(() => ForumThreadEmoji, () => ForumThreadEmojiUser)
  threadEmojis!: ForumThreadEmoji[];
}
