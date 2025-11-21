"use client";

import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Clock, Globe2, Sparkles } from "lucide-react";
import Link from "next/link";

export function Header() {
  const { isSignedIn } = useUser();

  return (
    <header className="relative z-10 backdrop-blur-xl bg-white/30 dark:bg-gray-900/30 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative">
              <Globe2 className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
              <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Global Time
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">Convert time instantly</p>
            </div>
          </Link>
          {isSignedIn ? (
            <div className="flex items-center gap-4">
              <Link href="/admin">
                <Button variant="ghost" size="sm">
                  Admin
                </Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <SignInButton mode="modal">
              <Button variant="outline" className="backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 border-white/30">
                <Clock className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            </SignInButton>
          )}
        </div>
      </div>
    </header>
  );
}