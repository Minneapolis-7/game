import { Optional } from 'sequelize';
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

/* eslint-disable import/no-cycle */
import { Emoji, ForumThread, ForumThreadEmojiUser, User } from '@/server/sequelize/models';
import { IntrinsicModelAttributes } from '@/server/shared/types';
/* eslint-enable */

export type ForumThreadEmojiAttributes = {
  threadId: number;
  emojiId: number;
} & IntrinsicModelAttributes;

export type ForumThreadEmojiCreationAttributes = Optional<
  ForumThreadEmojiAttributes,
  keyof IntrinsicModelAttributes
>;

@Table({
  underscored: true,
  modelName: 'ForumThreadEmoji',
  tableName: 'forum_thread_emojis',
})
export default class ForumThreadEmoji extends Model<
  ForumThreadEmojiAttributes,
  ForumThreadEmojiCreationAttributes
> {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => ForumThread)
  @Column(DataType.INTEGER)
  threadId!: number;

  @ForeignKey(() => Emoji)
  @Column(DataType.INTEGER)
  emojiId!: number;

  @BelongsTo(() => ForumThread)
  thread?: ForumThread;

  @BelongsTo(() => Emoji)
  emoji?: Emoji;

  @BelongsToMany(() => User, () => ForumThreadEmojiUser)
  users!: User[];

  @HasMany(() => ForumThreadEmojiUser, {
    onDelete: 'CASCADE',
  })
  threadEmojiUsers?: ForumThreadEmojiUser[];
}
