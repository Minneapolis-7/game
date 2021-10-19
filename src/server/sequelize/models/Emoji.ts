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
  utfCode: string;
  htmlEntityCode: string;
} & IntrinsicModelAttributes;

@Table({
  underscored: true,
  modelName: 'Emoji',
  tableName: 'emojis',
})
export default class Emoji extends Model<EmojiAttributes> {
  @AllowNull(false)
  @Column(DataType.TEXT)
  utfCode!: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  htmlEntityCode!: string;

  @BelongsToMany(() => ForumComment, {
    through: {
      model: () => ForumCommentEmoji,
      unique: false,
    },
  })
  comments!: ForumComment[];

  @HasMany(() => ForumCommentEmoji)
  commentEmojis?: ForumCommentEmoji[];

  @BelongsToMany(() => ForumThread, {
    through: {
      model: () => ForumThreadEmoji,
      unique: false,
    },
  })
  threads!: ForumThread[];

  @HasMany(() => ForumThreadEmoji)
  threadEmojis?: ForumThreadEmoji[];
}
