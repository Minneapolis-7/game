import { AllowNull, Column, DataType, Model, Table, Unique } from 'sequelize-typescript';

import UnderscoredIndex from '@/server/sequelize/utils/UnderscoredIndex';
import { IntrinsicModelAttributes } from '@/server/shared/types';

export type SiteThemeAttributes = {
  name: string;
  description: string;
} & IntrinsicModelAttributes;

@Table({
  underscored: true,
  tableName: 'site_themes',
  modelName: 'SiteTheme',
})
export default class SiteTheme extends Model<SiteThemeAttributes> {
  @UnderscoredIndex
  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  description!: string;
}
