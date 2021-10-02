import {
  AllowNull,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

/* eslint-disable import/no-cycle */
import {
  Emoji,
  ForumComment,
  ForumSection,
  ForumThreadEmoji,
  User,
} from '@/server/sequelize/models';
/* eslint-enable */

@Table({
  underscored: true,
  modelName: 'ForumThread',
})
export default class ForumThread extends Model<ForumThread> {
  @AllowNull(false)
  @Column(DataType.TEXT)
  title!: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  content!: string;

  @AllowNull(false)
  @Default(0)
  @Column(DataType.INTEGER)
  visitedCounter!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => ForumSection)
  @Column(DataType.INTEGER)
  sectionId!: number;

  @BelongsTo(() => ForumSection)
  section!: ForumSection;

  @BelongsToMany(() => Emoji, () => ForumThreadEmoji)
  emojis!: Emoji[];

  @HasMany(() => ForumComment)
  comments?: ForumComment[];
}
