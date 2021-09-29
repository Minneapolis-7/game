import { AllowNull, BelongsTo, Column, Model, Table } from 'sequelize-typescript';

// eslint-disable-next-line import/no-cycle
import ForumUser from './ForumUser';

@Table({
  timestamps: false,
  modelName: 'ForumThread',
  tableName: 'ForumThreads',
})
export default class ForumThread extends Model<ForumThread> {
  @AllowNull(false)
  @Column
  title!: string;

  @AllowNull(false)
  @Column
  content!: string;

  @AllowNull(false)
  @Column
  rating!: string;

  @BelongsTo(() => ForumUser)
  user?: ForumUser;
}
