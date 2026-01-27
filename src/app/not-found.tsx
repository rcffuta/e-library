"use client";

import Link from "next/link";
import { 
    BookOpen, 
    Home, 
    Search, 
    Library, 
    FileQuestion
} from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-white flex items-center justify-center p-4">
            <div className="max-w-2xl mx-auto text-center">
                {/* Error Illustration */}
                <div className="relative mb-8">
                    <div className="mx-auto h-32 w-32 bg-rcf-navy rounded-full flex items-center justify-center shadow-2xl">
                        <FileQuestion className="h-16 w-16 text-rcf-gold" />
                    </div>
                    {/* Floating Books Animation */}
                    <div className="absolute -top-4 -left-8 h-8 w-8 bg-rcf-gold/20 rounded-lg flex items-center justify-center animate-bounce">
                        <BookOpen className="h-4 w-4 text-rcf-navy" />
                    </div>
                    <div className="absolute -top-2 -right-6 h-6 w-6 bg-rcf-navy/20 rounded-lg flex items-center justify-center animate-bounce delay-150">
                        <Library className="h-3 w-3 text-rcf-gold" />
                    </div>
                </div>

                {/* Error Content */}
                <div className="space-y-6">
                    {/* Error Code */}
                    <h1 className="text-8xl font-bold bg-linear-to-r from-rcf-navy to-rcf-navy-light bg-clip-text text-transparent">
                        404
                    </h1>
                    
                    {/* Error Message */}
                    <div className="space-y-3">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Page Not Found
                        </h2>
                        <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
                            The page you&apos;re looking for seems to have wandered off from our digital library.
                        </p>
                    </div>

                    {/* Fellowship Context */}
                    <div className="p-6 bg-rcf-gold/5 rounded-xl border border-rcf-gold/20 max-w-md mx-auto">
                        <div className="flex items-center justify-center gap-3 mb-3">
                            <Library className="h-5 w-5 text-rcf-navy" />
                            <span className="font-semibold text-rcf-navy">RCF FUTA E-Library</span>
                        </div>
                        <p className="text-sm text-gray-600">
                            Don&apos;t worry! Our library is full of resources waiting for you to discover.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                        <Link
                            href="/"
                            className="flex items-center gap-3 px-6 py-3 bg-linear-to-r from-rcf-navy to-rcf-navy-light text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
                        >
                            <Home className="h-5 w-5" />
                            <span>Return to Library</span>
                        </Link>
                        
                        <Link
                            href="/"
                            className="flex items-center gap-3 px-6 py-3 bg-white text-rcf-navy border-2 border-rcf-navy rounded-xl font-semibold hover:bg-rcf-navy hover:text-white transition-all duration-200"
                        >
                            <Search className="h-5 w-5" />
                            <span>Browse Materials</span>
                        </Link>
                    </div>

                    {/* Helpful Suggestions */}
                    <div className="pt-8 border-t border-gray-200 max-w-lg mx-auto">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            What you can do:
                        </h3>
                        <div className="grid gap-3 text-sm text-gray-600 text-left">
                            <div className="flex items-start gap-3">
                                <div className="h-2 w-2 bg-rcf-gold rounded-full mt-2 shrink-0"></div>
                                <span>Check the URL for any typing errors</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="h-2 w-2 bg-rcf-gold rounded-full mt-2 shrink-0"></div>
                                <span>Browse our course materials and past questions</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="h-2 w-2 bg-rcf-gold rounded-full mt-2 shrink-0"></div>
                                <span>Use the search function to find specific resources</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="h-2 w-2 bg-rcf-gold rounded-full mt-2 shrink-0"></div>
                                <span>Contact the Fellowship Library Unit if you need help</span>
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