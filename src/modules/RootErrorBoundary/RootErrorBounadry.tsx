import React, { Component, PropsWithChildren, ReactNode, ErrorInfo } from 'react';

import FallbackError from 'components/FallbackError';
import logClientError from 'utils/logClientError';

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
      return <FallbackError>{this.state.error.message}</FallbackError>;
    }

    return this.props.children;
  }
}

export default RootErrorBoundary;
