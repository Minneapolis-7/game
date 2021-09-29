import { AllowNull, Column, Model, Table } from 'sequelize-typescript';

@Table({
  timestamps: false,
  modelName: 'ForumCategory',
  tableName: 'ForumCategories',
})
export default class ForumCategory extends Model<ForumCategory> {
  @AllowNull(false)
  @Column
  name!: string;
}
