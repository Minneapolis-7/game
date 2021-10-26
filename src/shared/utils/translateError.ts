import { AxiosError } from 'axios';

import text from '@/shared/const/text';

type ServerErrorResponse = {
  reason: string;
};
type UnknownError = Error | AxiosError | ServerErrorResponse;

const { generic: genericErrorMessage } = text.errorDescriptions;

function isAxiosError(error: UnknownError): error is AxiosError {
  return (error as AxiosError).isAxiosError;
}

export default function translateError(error: UnknownError): string {
  console.log(error);

  if (!isAxiosError(error)) {
    const { reason } = error as ServerErrorResponse;

    return text.yandexApiErrorReasons[reason] || genericErrorMessage;
  }

  if (error.response) {
    const { status } = error.response;

    return text.statusCodeDescriptions[status] || genericErrorMessage;
  }

  return genericErrorMessage;
}
