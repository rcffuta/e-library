"use client";

import { useState } from "react";

import { toast } from "sonner";
import { Loader2, Library, BookOpen } from "lucide-react";
import Link from "next/link";
import { loginAction } from "./action";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

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
            {/* LEFT SIDE - Branding & Aesthetics */}
            <div className="hidden lg:flex w-1/2 bg-rcf-navy text-white flex-col justify-between p-12 relative overflow-hidden">
                {/* Background Pattern - Enhanced with gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-br from-rcf-navy via-rcf-navy to-rcf-navy-dark"></div>
                <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] bg-size-[20px_20px]"></div>

                {/* Logo Area */}
                <div className="relative z-10 flex items-center gap-3 text-2xl font-bold tracking-tight text-white">
                    <div className="h-12 w-12 bg-rcf-gold rounded-xl flex items-center justify-center shadow-lg">
                        <Library className="h-7 w-7 text-rcf-navy" />
                    </div>
                    <span className="bg-linear-to-r from-white to-gray-200 bg-clip-text text-transparent">
                        RCF FUTA E-Library
                    </span>
                </div>

                {/* Motivational / Context Text */}
                <div className="relative z-10 max-w-lg">
                    <blockquote className="space-y-3">
                        <p className="text-lg leading-relaxed text-gray-100">
                            &quot;Study to shew thyself approved unto God, a workman
                            that needeth not to be ashamed...&#34;
                        </p>
                        <footer className="text-sm font-medium text-rcf-gold">
                            2 Timothy 2:15
                        </footer>
                    </blockquote>
                </div>

                {/* Footer Info */}
                <div className="relative z-10 text-sm text-gray-300">
                    &copy; {new Date().getFullYear()} RCF FUTA ICT Unit.
                </div>
            </div>

            {/* RIGHT SIDE - Login Form */}
            <div className="flex flex-1 flex-col items-center justify-center bg-gray-50 p-8 sm:p-12">
                <div className="w-full max-w-sm space-y-8">
                    {/* Header */}
                    <div className="text-center lg:text-left">
                        <div className="lg:hidden mx-auto h-12 w-12 bg-rcf-gold rounded-xl flex items-center justify-center mb-4 shadow-lg">
                            <BookOpen className="h-7 w-7 text-rcf-navy" />
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                            Member Access
                        </h2>
                        <p className="mt-3 text-base text-gray-600">
                            Sign in with your RCF Portal credentials.
                        </p>
                    </div>

                    {/* Form */}
                    <form action={handleSubmit} className="mt-8 space-y-6">
                        <div className="space-y-5">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-semibold text-gray-800 mb-2"
                                >
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    placeholder="student@futa.edu.ng"
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
                                    href="#"
                                    className="font-semibold text-rcf-navy hover:text-rcf-navy-light transition-colors duration-200"
                                >
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative flex w-full justify-center rounded-xl bg-rcf-navy px-4 py-3.5 text-sm font-semibold text-white shadow-lg hover:bg-rcf-navy-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rcf-navy disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
                        >
                            {isLoading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                "Sign in"
                            )}
                        </button>
                    </form>

                    {/* Register Link */}
                    <p className="mt-10 text-center text-sm text-gray-600">
                        Not a member yet?{" "}
                        <Link
                            href="https://ict.rcffuta.com/register"
                            className="font-semibold text-rcf-navy hover:text-rcf-navy-light transition-colors duration-200 hover:underline"
                        >
                            Register on the Portal
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
