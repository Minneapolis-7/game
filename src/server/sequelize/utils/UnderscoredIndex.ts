import { annotateModelWithIndex } from 'sequelize-typescript';

import toCase from '@/shared/utils/toCase';

// https://github.com/RobinBuschmann/sequelize-typescript/issues/725#issuecomment-686608021
export default function UnderscoredIndex<T>(target: T, key: string): void {
  annotateModelWithIndex(target, toCase(key, 'camel', 'snake'));
}
