"use client";

import Link from "next/link";
import { 
    AlertTriangle, 
    RefreshCw, 
    Home, 
    Library, 
    BookOpen,
    Settings
} from "lucide-react";
import { useEffect } from "react";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error("Global Error:", error);
    }, [error]);

    return (
        <html>
            <body>
                <div className="min-h-screen bg-linear-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
                    <div className="max-w-2xl mx-auto text-center">
                        {/* Error Illustration */}
                        <div className="relative mb-8">
                            <div className="mx-auto h-32 w-32 bg-red-600 rounded-full flex items-center justify-center shadow-2xl">
                                <AlertTriangle className="h-16 w-16 text-white" />
                            </div>
                            {/* Floating Elements */}
                            <div className="absolute -top-4 -left-8 h-8 w-8 bg-orange-200 rounded-lg flex items-center justify-center animate-pulse">
                                <Settings className="h-4 w-4 text-red-600" />
                            </div>
                            <div className="absolute -top-2 -right-6 h-6 w-6 bg-red-200 rounded-lg flex items-center justify-center animate-pulse delay-150">
                                <Library className="h-3 w-3 text-red-700" />
                            </div>
                        </div>

                        {/* Error Content */}
                        <div className="space-y-6">
                            {/* Error Code */}
                            <h1 className="text-8xl font-bold bg-linear-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                                500
                            </h1>
                            
                            {/* Error Message */}
                            <div className="space-y-3">
                                <h2 className="text-3xl font-bold text-gray-900">
                                    Something Went Wrong
                                </h2>
                                <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
                                    We&apos;re experiencing technical difficulties with our digital library system.
                                </p>
                            </div>

                            {/* Fellowship Context */}
                            <div className="p-6 bg-red-50 rounded-xl border border-red-200 max-w-md mx-auto">
                                <div className="flex items-center justify-center gap-3 mb-3">
                                    <Library className="h-5 w-5 text-red-700" />
                                    <span className="font-semibold text-red-800">RCF FUTA E-Library</span>
                                </div>
                                <p className="text-sm text-red-700">
                                    Our technical team has been notified and is working to resolve this issue.
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
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                                <button
                                    onClick={reset}
                                    className="flex items-center gap-3 px-6 py-3 bg-linear-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
                                >
                                    <RefreshCw className="h-5 w-5" />
                                    <span>Try Again</span>
                                </button>
                                
                                <Link
                                    href="/"
                                    className="flex items-center gap-3 px-6 py-3 bg-white text-red-600 border-2 border-red-600 rounded-xl font-semibold hover:bg-red-600 hover:text-white transition-all duration-200"
                                >
                                    <Home className="h-5 w-5" />
                                    <span>Return Home</span>
                                </Link>
                            </div>

                            {/* Helpful Information */}
                            <div className="pt-8 border-t border-gray-200 max-w-lg mx-auto">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    What happened?
                                </h3>
                                <div className="grid gap-3 text-sm text-gray-600 text-left">
                                    <div className="flex items-start gap-3">
                                        <div className="h-2 w-2 bg-red-500 rounded-full mt-2 shrink-0"></div>
                                        <span>A server error occurred while processing your request</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="h-2 w-2 bg-red-500 rounded-full mt-2 shrink-0"></div>
                                        <span>The issue has been automatically reported to our team</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="h-2 w-2 bg-red-500 rounded-full mt-2 shrink-0"></div>
                                        <span>You can try refreshing the page or returning to the homepage</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="h-2 w-2 bg-red-500 rounded-full mt-2 shrink-0"></div>
                                        <span>If the problem persists, contact the Fellowship ICT Unit</span>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="pt-6">
                                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 max-w-md mx-auto">
                                    <h4 className="font-semibold text-blue-900 mb-2">Need immediate help?</h4>
                                    <p className="text-sm text-blue-800">
                                        Contact the Fellowship ICT Unit or visit the main RCF FUTA portal for assistance.
                                    </p>
                                    <div className="mt-3">
                                        <Link
                                            href="https://ict.rcffuta.com"
                                            className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 hover:text-blue-900 transition-colors"
                                        >
                                            <BookOpen className="h-4 w-4" />
                                            Visit RCF Portal
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
            </body>
        </html>
    );
}