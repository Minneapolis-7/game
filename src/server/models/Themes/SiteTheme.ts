import { AllowNull, Column, DataType, Index, Model, Table, Unique } from 'sequelize-typescript';

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'site_theme',
})
export default class SiteTheme extends Model<SiteTheme> {
  @Index
  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  theme!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  description!: string;
}
