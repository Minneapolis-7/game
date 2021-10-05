import {
  AllowNull,
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

/* eslint-disable import/no-cycle */
import {
  ForumComment,
  ForumCommentEmoji,
  ForumThread,
  ForumThreadEmoji,
} from '@/server/sequelize/models';
import { IntrinsicModelAttributes } from '@/server/shared/types';
/* eslint-enable */

export type EmojiAttributes = {
  code: string;
} & IntrinsicModelAttributes;

@Table({
  underscored: true,
  modelName: 'Emoji',
})
export default class Emoji extends Model<EmojiAttributes> {
  @AllowNull(false)
  @Column(DataType.TEXT)
  code!: string;

  @BelongsToMany(() => ForumComment, () => ForumCommentEmoji)
  comments!: ForumComment[];

  @HasMany(() => ForumCommentEmoji)
  commentEmojis?: ForumCommentEmoji[];

  @BelongsToMany(() => ForumThread, () => ForumThreadEmoji)
  threads!: ForumThread[];
}
