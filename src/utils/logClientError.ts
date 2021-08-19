import { ErrorInfo } from 'react';

export default function logClientError(error: Error, errorInfo: ErrorInfo): void {
  console.error(error, errorInfo);
}
