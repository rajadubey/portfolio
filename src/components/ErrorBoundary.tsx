'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  section?: string | undefined;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
    
    // In production, you might want to log to an error reporting service
    // Example: logErrorToService(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
          <AlertTriangle className="w-12 h-12 text-yellow-500 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {this.props.section ? `${this.props.section} Error` : 'Something went wrong'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
            We encountered an error while loading this section. This doesn't affect other parts of the site.
          </p>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="mb-4 text-left">
              <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                Error Details (Development)
              </summary>
              <pre className="mt-2 p-2 bg-red-50 text-red-800 text-xs rounded overflow-auto max-w-md">
                {this.state.error.message}
                {this.state.error.stack}
              </pre>
            </details>
          )}
          <button
            onClick={this.handleRetry}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Higher-order component for easier usage
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  section?: string
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary section={section}>
      <Component {...props} />
    </ErrorBoundary>
  );
  
  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}

// Specialized error boundaries for different sections
export const HeroErrorBoundary = ({ children }: { children: ReactNode }) => (
  <ErrorBoundary section="Hero Section">
    {children}
  </ErrorBoundary>
);

export const ExperienceErrorBoundary = ({ children }: { children: ReactNode }) => (
  <ErrorBoundary section="Experience Section">
    {children}
  </ErrorBoundary>
);

export const ProjectsErrorBoundary = ({ children }: { children: ReactNode }) => (
  <ErrorBoundary section="Projects Section">
    {children}
  </ErrorBoundary>
);

export const ContactErrorBoundary = ({ children }: { children: ReactNode }) => (
  <ErrorBoundary section="Contact Section">
    {children}
  </ErrorBoundary>
);