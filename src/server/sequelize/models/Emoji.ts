import { AllowNull, BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';

/* eslint-disable import/no-cycle */
import {
  ForumComment,
  ForumCommentEmoji,
  ForumThread,
  ForumThreadEmoji,
} from '@/server/sequelize/models';
/* eslint-enable */

@Table({
  underscored: true,
  modelName: 'Emoji',
})
export default class Emoji extends Model<Emoji> {
  @AllowNull(false)
  @Column(DataType.TEXT)
  code!: string;

  @BelongsToMany(() => ForumComment, () => ForumCommentEmoji)
  comments!: ForumComment[];

  @BelongsToMany(() => ForumThread, () => ForumThreadEmoji)
  threads!: ForumThread[];
}
