import { AllowNull, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';

import SiteTheme from './SiteTheme';

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'user_theme',
})
export default class UserTheme extends Model<UserTheme> {
  @ForeignKey(() => SiteTheme)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  themeId!: number;

  @Column(DataType.STRING)
  device!: string;

  // @ForeignKey(() => User)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'owner_id',
  })
  ownerId!: string;
}
