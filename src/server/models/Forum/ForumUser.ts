import { AllowNull, Column, HasMany, Index, Model, Table } from 'sequelize-typescript';

// eslint-disable-next-line import/no-cycle
import ForumComment from './ForumComment';
// eslint-disable-next-line import/no-cycle
import ForumThread from './ForumThread';

@Table({
  timestamps: false,
  modelName: 'ForumUser',
  tableName: 'ForumUsers',
})
export default class ForumUser extends Model<ForumUser> {
  @AllowNull(false)
  @Index
  @Column
  yandexUserId!: number;

  @AllowNull(false)
  @Column
  firstName!: string;

  @AllowNull(false)
  @Column
  secondName!: string;

  @Column
  displayName?: string;

  @Column
  avatarUrl?: string;

  @HasMany(() => ForumComment)
  comments?: ForumComment[];

  @HasMany(() => ForumThread)
  threads?: ForumThread[];
}
