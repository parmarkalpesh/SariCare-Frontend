import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                    <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-red-100 text-center">
                        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
                            <AlertCircle size={32} />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
                        <p className="text-gray-600 mb-6">
                            We apologize for the inconvenience. The application encountered an unexpected error.
                        </p>

                        {/* 
                        <div className="bg-gray-100 p-4 rounded-lg text-left text-xs font-mono text-gray-700 mb-6 overflow-auto max-h-32">
                            {this.state.error?.toString()}
                        </div> 
                        */}

                        <button
                            onClick={() => window.location.reload()}
                            className="w-full flex justify-center items-center gap-2 py-3 px-4 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all"
                        >
                            <RefreshCw size={18} />
                            Reload Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
