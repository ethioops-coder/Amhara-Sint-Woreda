"use client";

import React from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#0B3D2E] px-4">
          <div className="text-center max-w-md">
            <img src="/logo.png" alt="Amhara Sayint Woreda" className="w-20 h-20 mx-auto mb-6 rounded-2xl" />
            <h1 className="text-2xl font-bold text-white mb-3">Something went wrong</h1>
            <p className="text-white/60 mb-6 text-sm">
              The page encountered an error. Please try refreshing.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#EAB308] hover:bg-[#CA8A04] text-[#0B3D2E] font-bold px-6 py-3 rounded-xl transition-all"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
