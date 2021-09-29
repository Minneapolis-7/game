import { AllowNull, BelongsTo, Column, Model, Table } from 'sequelize-typescript';

// eslint-disable-next-line import/no-cycle
import ForumUser from './ForumUser';

@Table({
  timestamps: false,
  modelName: 'ForumComment',
  tableName: 'ForumComments',
})
export default class ForumComment extends Model<ForumComment> {
  @AllowNull(false)
  @Column
  content!: string;

  @AllowNull(false)
  @Column
  rating!: string;

  @BelongsTo(() => ForumUser)
  user?: ForumUser;
}
