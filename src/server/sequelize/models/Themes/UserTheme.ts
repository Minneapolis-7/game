import { AllowNull, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';

import SiteTheme from './SiteTheme';

import User from '../User';

export type UserThemeCreationAttributes = {
  themeId: number;
  device: string | null;
  ownerId: string;
};

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'user_themes',
  modelName: 'UserTheme',
})
export default class UserTheme extends Model<UserTheme, UserThemeCreationAttributes> {
  @ForeignKey(() => SiteTheme)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  themeId!: number;

  @Column(DataType.STRING)
  device!: string | null;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'owner_id',
  })
  ownerId!: string;
}
