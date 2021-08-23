import React, { Component, ErrorInfo, PropsWithChildren, ReactNode } from 'react';

import FallbackError from '@/components/FallbackError';
import logClientError from '@/shared/utils/logClientError';

type RootErrorBoundaryProps = PropsWithChildren<Record<string, unknown>>;

type RootErrorBoundaryState = {
  hasError: boolean;
  error: Error;
};

class RootErrorBoundary extends Component<RootErrorBoundaryProps, RootErrorBoundaryState> {
  state = { hasError: false } as RootErrorBoundaryState;

  static getDerivedStateFromError(error: Error): RootErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    logClientError(error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return <FallbackError />;
    }

    return this.props.children;
  }
}

export default RootErrorBoundary;
