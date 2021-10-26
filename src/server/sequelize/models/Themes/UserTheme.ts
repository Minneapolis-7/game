import { AllowNull, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';

import SiteTheme from './SiteTheme';

import User from '../User';

export type UserThemeCreationAttributes = {
  themeId: number;
  userId: number;
};

@Table({
  underscored: true,
  tableName: 'user_themes',
  modelName: 'UserTheme',
})
export default class UserTheme extends Model<UserTheme, UserThemeCreationAttributes> {
  @ForeignKey(() => SiteTheme)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  themeId!: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  userId!: number;
}
