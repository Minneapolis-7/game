import { ErrorInfo } from 'react';

export default function logClientError(error: Error, errorInfo: ErrorInfo): void {
  console.log(error, errorInfo);
}
