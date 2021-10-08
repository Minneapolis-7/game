import { AllowNull, Column, DataType, Model, Table, Unique } from 'sequelize-typescript';

import UnderscoredIndex from '@/server/sequelize/utils/UnderscoredIndex';

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'site_themes',
  modelName: 'SiteTheme',
})
export default class SiteTheme extends Model<SiteTheme> {
  @UnderscoredIndex
  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  description!: string;
}
