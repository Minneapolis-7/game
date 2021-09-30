import { Model, Table, Column, AutoIncrement, PrimaryKey, AllowNull, ForeignKey, DataType } from 'sequelize-typescript';
import {SiteTheme} from './SiteTheme';

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'user_theme'
})
export class UserTheme extends Model<UserTheme> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

    @ForeignKey(() => SiteTheme)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  themeId: number; 

  @Column(DataType.STRING)
  device: string;

    // @ForeignKey(() => User)
  @AllowNull(false)
  @Column({
      type: DataType.INTEGER,
      field: 'owner_id'
  })
  ownerId: string;
} 