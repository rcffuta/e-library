"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Library, BookOpen, GraduationCap, Users, BookOpenCheck, Quote } from "lucide-react";
import Link from "next/link";
import { loginAction } from "./action";
import { useRouter } from "next/navigation";
// import { useAuthStore } from "@/store/auth.store";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    // const { initialize } = useAuthStore();

    async function handleSubmit(formData: FormData) {
        setIsLoading(true);

        // Server Action
        const result = await loginAction(formData);

        // If we get a result back, it means there was an error
        // (Success redirects automatically)
        if (result?.error) {
            toast.error(result.error);
            setIsLoading(false);
            return;
        }

        if (result?.success) {
            toast.success("Welcome back!");

            // Initialize the auth store with fresh session data
            // await initialize();

            // Check role from response to decide where to go
            if (result.role === "ADMIN") {
                router.push("/admin/dashboard");
            } else {
                router.push("/");
            }

            // Note: We don't set isLoading(false) here because
            // the redirect happens and we want the spinner to persist
            // until the new page loads.
        }
    }

    return (
        <div className="flex min-h-screen w-full">
            {/* LEFT SIDE - Fellowship Library Branding */}
            <div className="hidden lg:flex w-1/2 bg-rcf-navy text-white flex-col justify-between p-12 relative overflow-hidden">
                {/* Enhanced Background with Book Pattern */}
                <div className="absolute inset-0 bg-linear-to-br from-rcf-navy via-rcf-navy-light to-rcf-navy"></div>
                <div className="absolute inset-0 opacity-5">
                    {/* Book pattern overlay */}
                    <div className="grid grid-cols-12 gap-4 transform rotate-12 scale-150">
                        {Array.from({ length: 120 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-6 w-4 bg-rcf-gold/20 rounded-sm"
                            ></div>
                        ))}
                    </div>
                </div>
                <div className="absolute top-20 right-20 opacity-10">
                    <Library className="h-64 w-64 text-rcf-gold" />
                </div>

                {/* Header - Fellowship Library Identity */}
                <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-4 text-2xl font-bold tracking-tight text-white">
                        <div className="h-14 w-14 bg-rcf-gold rounded-xl flex items-center justify-center shadow-xl border-2 border-white/10">
                            <Library className="h-8 w-8 text-rcf-navy" />
                        </div>
                        <div>
                            <div className="bg-linear-to-r from-white to-gray-200 bg-clip-text text-transparent text-xl">
                                RCF FUTA
                            </div>
                            <div className="text-rcf-gold text-lg font-semibold">
                                Digital Library
                            </div>
                        </div>
                    </div>

                    <div className="text-gray-200 text-sm font-medium">
                        📖 Fellowship Library Unit • Knowledge Hub
                    </div>
                </div>

                {/* Mission Statement & Features */}
                <div className="relative z-10 space-y-8">
                    <div className="space-y-6">
                        <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
                            <Quote className="h-6 w-6 text-rcf-gold mt-1 shrink-0" />
                            <div>
                                <p className="text-lg leading-relaxed text-gray-100 italic">
                                    &ldquo;Excellence in education through
                                    faith, knowledge, and Christian
                                    fellowship.&rdquo;
                                </p>
                                <p className="text-sm text-rcf-gold mt-2 font-medium">
                                    RCF FUTA Library Unit
                                </p>
                            </div>
                        </div>

                        {/* Key Features */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-white">
                                Access Your Resources:
                            </h3>
                            <div className="grid gap-3">
                                <div className="flex items-center gap-3 text-gray-200">
                                    <BookOpenCheck className="h-5 w-5 text-rcf-gold" />
                                    <span>
                                        📚 Past Questions & Study Materials
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-200">
                                    <GraduationCap className="h-5 w-5 text-rcf-gold" />
                                    <span>
                                        📖 Lecture Notes & Academic Resources
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-200">
                                    <Users className="h-5 w-5 text-rcf-gold" />
                                    <span>🤝 Fellowship Library Community</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Educational Inspiration */}
                    <div className="p-6 bg-linear-to-r from-rcf-gold/10 to-transparent rounded-xl border-l-4 border-rcf-gold">
                        <blockquote className="space-y-3">
                            <p className="text-lg leading-relaxed text-white font-medium">
                                &ldquo;Knowledge is power, but shared knowledge
                                builds communities. Together we grow, learn, and
                                achieve excellence in our academic
                                journey.&rdquo;
                            </p>
                            <footer className="text-sm font-semibold text-rcf-gold">
                                RCF FUTA Fellowship Library
                            </footer>
                        </blockquote>
                    </div>
                </div>

                {/* Footer with Fellowship Identity */}
                <div className="relative z-10 space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="h-2 w-2 bg-rcf-gold rounded-full"></div>
                        <span>
                            Empowering Christian Students with Knowledge
                        </span>
                    </div>
                    <div className="text-xs text-gray-400">
                        &copy; {new Date().getFullYear()} Rivers College
                        Fellowship, FUTA • Library Unit
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE - Enhanced Login Form */}
            <div className="flex flex-1 flex-col items-center justify-center bg-linear-to-br from-gray-50 to-white p-8 sm:p-12">
                <div className="w-full max-w-sm space-y-8">
                    {/* Header with Fellowship Touch */}
                    <div className="text-center lg:text-left">
                        <div className="lg:hidden mx-auto h-14 w-14 bg-rcf-gold rounded-xl flex items-center justify-center mb-6 shadow-xl border-2 border-rcf-navy/10">
                            <BookOpen className="h-8 w-8 text-rcf-navy" />
                        </div>
                        
                        {/* Mobile-only Fellowship Information */}
                        <div className="lg:hidden mb-8 p-4 bg-rcf-navy/5 rounded-xl border border-rcf-navy/10">
                            <div className="text-center space-y-3">
                                <h1 className="text-xl font-bold text-rcf-navy">
                                    RCF FUTA Digital Library
                                </h1>
                                <p className="text-sm text-gray-600 italic">
                                    &ldquo;Excellence in education through faith, knowledge, and Christian fellowship.&rdquo;
                                </p>
                                <div className="flex items-center justify-center gap-1 text-xs text-rcf-navy font-medium">
                                    <div className="h-1 w-1 bg-rcf-gold rounded-full"></div>
                                    <span>Fellowship Library Unit • Knowledge Hub</span>
                                    <div className="h-1 w-1 bg-rcf-gold rounded-full"></div>
                                </div>
                            </div>
                            
                            {/* Mobile Features Preview */}
                            <div className="mt-4 grid grid-cols-1 gap-2 text-xs">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <BookOpenCheck className="h-3 w-3 text-rcf-gold" />
                                    <span>Past Questions & Study Materials</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <GraduationCap className="h-3 w-3 text-rcf-gold" />
                                    <span>Lecture Notes & Academic Resources</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Users className="h-3 w-3 text-rcf-gold" />
                                    <span>Fellowship Learning Community</span>
                                </div>
                            </div>
                        </div>
                        
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                            Fellowship Access
                        </h2>
                        <p className="mt-3 text-base text-gray-600">
                            Welcome back! Sign in with your RCF Portal
                            credentials to access our digital library.
                        </p>
                        <div className="mt-4 flex items-center justify-center lg:justify-start gap-2 text-sm text-rcf-navy">
                            <Library className="h-4 w-4" />
                            <span className="font-medium">
                                Secure Library Access
                            </span>
                        </div>
                    </div>

                    {/* Enhanced Form */}
                    <form action={handleSubmit} className="mt-8 space-y-6">
                        <div className="space-y-5">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-semibold text-gray-800 mb-2"
                                >
                                    Fellowship Email Address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    placeholder="yourname@futa.edu.ng"
                                    className="block w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3.5 text-gray-900 placeholder-gray-500 shadow-sm transition-all duration-200 focus:border-rcf-gold focus:bg-white focus:outline-none focus:ring-2 focus:ring-rcf-gold/20 hover:border-gray-400 sm:text-sm"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-semibold text-gray-800 mb-2"
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    placeholder="••••••••"
                                    className="block w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3.5 text-gray-900 placeholder-gray-500 shadow-sm transition-all duration-200 focus:border-rcf-gold focus:bg-white focus:outline-none focus:ring-2 focus:ring-rcf-gold/20 hover:border-gray-400 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <a
                                    href="https://ict.rcffuta.com/forgot-password"
                                    className="font-semibold text-rcf-navy hover:text-rcf-navy-light transition-colors duration-200"
                                >
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative flex w-full justify-center rounded-xl bg-linear-to-r from-rcf-navy to-rcf-navy-light px-4 py-3.5 text-sm font-semibold text-white shadow-lg hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rcf-navy disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 hover:-translate-y-0.5"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                {!isLoading && (
                                    <Library className="h-5 w-5 text-rcf-gold" />
                                )}
                            </span>
                            {isLoading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                "Access Digital Library"
                            )}
                        </button>
                    </form>

                    {/* Enhanced Register Link */}
                    <div className="mt-8 p-4 bg-rcf-gold/5 rounded-xl border border-rcf-gold/20">
                        <p className="text-center text-sm text-gray-600">
                            New to RCF Fellowship?{" "}
                            <Link
                                href="https://ict.rcffuta.com/register"
                                className="font-semibold text-rcf-navy hover:text-rcf-navy-light transition-colors duration-200 hover:underline"
                            >
                                Join the Fellowship Portal
                            </Link>
                        </p>
                        <p className="text-center text-xs text-gray-500 mt-2">
                            📖 Get access to educational resources and
                            fellowship community
                        </p>
                    </div>
                    
                    {/* Mobile-only Additional Information */}
                    <div className="lg:hidden mt-6 space-y-4">
                        {/* Inspirational Quote for Mobile */}
                        <div className="p-4 bg-linear-to-r from-rcf-navy/5 to-rcf-gold/5 rounded-xl border-l-4 border-rcf-gold">
                            <blockquote className="text-center">
                                <p className="text-sm leading-relaxed text-gray-700 font-medium italic">
                                    &ldquo;Knowledge is power, but shared knowledge builds communities. 
                                    Together we grow, learn, and achieve excellence.&rdquo;
                                </p>
                                <footer className="text-xs font-semibold text-rcf-navy mt-2">
                                    RCF FUTA Fellowship Library
                                </footer>
                            </blockquote>
                        </div>
                        
                        {/* Mobile Footer Info */}
                        <div className="text-center space-y-2">
                            <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
                                <div className="h-1 w-1 bg-rcf-gold rounded-full"></div>
                                <span>Empowering Christian Students with Knowledge</span>
                                <div className="h-1 w-1 bg-rcf-gold rounded-full"></div>
                            </div>
                            <div className="text-xs text-gray-500">
                                &copy; {new Date().getFullYear()} Rivers College Fellowship, FUTA • Library & ICT Unit
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
