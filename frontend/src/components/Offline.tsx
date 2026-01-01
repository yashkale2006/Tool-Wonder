import React from 'react';
import { WifiOff, RefreshCw } from 'lucide-react';

interface OfflineProps {
  onRetry?: () => void;
}

const Offline: React.FC<OfflineProps> = ({ onRetry }) => {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Offline Icon */}
        <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <WifiOff className="w-12 h-12 text-red-600 dark:text-red-400" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
          You're Offline
        </h1>

        {/* Description */}
        <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
          It looks like you've lost your internet connection. Some features may not work properly until you're back online.
        </p>

        {/* Features that work offline */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 mb-8 border border-slate-200 dark:border-slate-700">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
            Available Offline:
          </h3>
          <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
            <li>• Browse tools and categories</li>
            <li>• View tool descriptions</li>
            <li>• Navigate between pages</li>
            <li>• Access previously loaded content</li>
          </ul>
        </div>

        {/* Retry Button */}
        <button
          onClick={handleRetry}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>

        {/* Additional Help */}
        <p className="text-sm text-slate-500 dark:text-slate-500 mt-6">
          Check your internet connection and refresh the page
        </p>
      </div>
    </div>
  );
};

export default Offline;
