"use client";

import Link from "next/link";
import { 
    AlertCircle, 
    RefreshCw, 
    Home, 
    Library, 
    BookOpen,
    Bug
} from "lucide-react";
import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error("Page Error:", error);
    }, [error]);

    return (
        <div className="min-h-screen bg-linear-to-br from-amber-50 to-yellow-50 flex items-center justify-center p-4">
            <div className="max-w-2xl mx-auto text-center">
                {/* Error Illustration */}
                <div className="relative mb-8">
                    <div className="mx-auto h-32 w-32 bg-amber-600 rounded-full flex items-center justify-center shadow-2xl">
                        <AlertCircle className="h-16 w-16 text-white" />
                    </div>
                    {/* Floating Elements */}
                    <div className="absolute -top-4 -left-8 h-8 w-8 bg-yellow-200 rounded-lg flex items-center justify-center animate-bounce">
                        <Bug className="h-4 w-4 text-amber-700" />
                    </div>
                    <div className="absolute -top-2 -right-6 h-6 w-6 bg-amber-200 rounded-lg flex items-center justify-center animate-bounce delay-150">
                        <Library className="h-3 w-3 text-amber-800" />
                    </div>
                </div>

                {/* Error Content */}
                <div className="space-y-6">
                    {/* Error Message */}
                    <div className="space-y-3">
                        <h1 className="text-4xl font-bold text-gray-900">
                            Oops! Something went wrong
                        </h1>
                        <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
                            We encountered an unexpected error while loading this page.
                        </p>
                    </div>

                    {/* Fellowship Context */}
                    <div className="p-6 bg-amber-50 rounded-xl border border-amber-200 max-w-md mx-auto">
                        <div className="flex items-center justify-center gap-3 mb-3">
                            <Library className="h-5 w-5 text-amber-700" />
                            <span className="font-semibold text-amber-800">RCF FUTA E-Library</span>
                        </div>
                        <p className="text-sm text-amber-700">
                            Don&apos;t worry - this is usually a temporary issue that can be resolved quickly.
                        </p>
                    </div>

                    {/* Error Details for Development */}
                    {process.env.NODE_ENV === "development" && error.message && (
                        <div className="p-4 bg-gray-100 rounded-lg max-w-lg mx-auto">
                            <h3 className="font-semibold text-gray-800 mb-2">Error Details:</h3>
                            <p className="text-sm text-gray-600 font-mono break-all">
                                {error.message}
                            </p>
                            {error.digest && (
                                <p className="text-xs text-gray-500 mt-2">
                                    Error ID: {error.digest}
                                </p>
                            )}
                            <details className="mt-3">
                                <summary className="text-sm font-medium text-gray-700 cursor-pointer">
                                    Stack Trace
                                </summary>
                                <pre className="text-xs text-gray-600 mt-2 whitespace-pre-wrap bg-gray-50 p-2 rounded overflow-x-auto">
                                    {error.stack}
                                </pre>
                            </details>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                        <button
                            onClick={reset}
                            className="flex items-center gap-3 px-6 py-3 bg-linear-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
                        >
                            <RefreshCw className="h-5 w-5" />
                            <span>Try Again</span>
                        </button>
                        
                        <Link
                            href="/"
                            className="flex items-center gap-3 px-6 py-3 bg-white text-amber-600 border-2 border-amber-600 rounded-xl font-semibold hover:bg-amber-600 hover:text-white transition-all duration-200"
                        >
                            <Home className="h-5 w-5" />
                            <span>Return to Library</span>
                        </Link>
                    </div>

                    {/* Helpful Tips */}
                    <div className="pt-8 border-t border-gray-200 max-w-lg mx-auto">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Quick fixes to try:
                        </h3>
                        <div className="grid gap-3 text-sm text-gray-600 text-left">
                            <div className="flex items-start gap-3">
                                <div className="h-2 w-2 bg-amber-500 rounded-full mt-2 shrink-0"></div>
                                <span>Refresh the page using the button above</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="h-2 w-2 bg-amber-500 rounded-full mt-2 shrink-0"></div>
                                <span>Check your internet connection</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="h-2 w-2 bg-amber-500 rounded-full mt-2 shrink-0"></div>
                                <span>Clear your browser cache and cookies</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="h-2 w-2 bg-amber-500 rounded-full mt-2 shrink-0"></div>
                                <span>Try accessing the page again in a few minutes</span>
                            </div>
                        </div>
                    </div>

                    {/* Support Information */}
                    <div className="pt-6">
                        <div className="p-4 bg-rcf-navy/5 rounded-xl border border-rcf-navy/20 max-w-md mx-auto">
                            <h4 className="font-semibold text-rcf-navy mb-2">Still having issues?</h4>
                            <p className="text-sm text-gray-700 mb-3">
                                If the problem continues, please report it to the Fellowship ICT Unit.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-2 text-sm">
                                <Link
                                    href="https://ict.rcffuta.com"
                                    className="inline-flex items-center gap-2 font-medium text-rcf-navy hover:text-rcf-navy-light transition-colors"
                                >
                                    <BookOpen className="h-4 w-4" />
                                    RCF Portal
                                </Link>
                                <span className="hidden sm:inline text-gray-400">•</span>
                                <Link
                                    href="/login"
                                    className="inline-flex items-center gap-2 font-medium text-rcf-navy hover:text-rcf-navy-light transition-colors"
                                >
                                    <Library className="h-4 w-4" />
                                    Library Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-12 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                        <Library className="h-4 w-4" />
                        <span>RCF FUTA Digital Library • Fellowship Library Unit</span>
                    </div>
                </div>
            </div>
        </div>
    );
}