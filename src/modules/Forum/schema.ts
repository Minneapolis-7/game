import * as yup from 'yup';
import { SchemaOf } from 'yup/es';

import { CreateThreadData, ReplyData } from '@/modules/Forum/types';
import text from '@/shared/const/text';

const { errors } = text.validation;

export const createThreadSchema: SchemaOf<CreateThreadData> = yup
  .object()
  .shape({
    threadHeader: yup.string().required(errors.required),
    threadMessage: yup.string().required(errors.required),
  })
  .defined();

export const replySchema: SchemaOf<ReplyData> = yup
  .object()
  .shape({
    replyMessage: yup.string().required(errors.required),
  })
  .defined();
