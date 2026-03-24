import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Study Planner",
  description: "A beautifully designed modern student task planner.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 font-sans text-slate-900">
        
        {/* Global Navigation Bar */}
        <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            {/* Logo area */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="flex h-9 w-9 bg-indigo-600 rounded-xl items-center justify-center shadow-sm group-hover:scale-105 group-hover:bg-indigo-700 transition-all duration-300">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-800">
                Study<span className="text-indigo-600">Planner</span>
              </span>
            </Link>

            {/* Nav Links */}
            <div className="flex items-center space-x-1 sm:space-x-4">
              <Link 
                href="/" 
                className="hidden sm:inline-flex px-3 py-2 rounded-lg text-sm font-semibold text-slate-500 hover:text-indigo-600 hover:bg-slate-50 transition-colors"
              >
                Home
              </Link>
              <Link 
                href="/tasks" 
                className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-500 hover:text-indigo-600 hover:bg-slate-50 transition-colors"
              >
                Tasks
              </Link>
              
              <div className="h-5 w-px bg-slate-200 mx-2 hidden sm:block"></div>
              
              <Link 
                href="/tasks/new" 
                className="inline-flex items-center px-4 py-2 bg-indigo-600/10 text-indigo-700 hover:bg-indigo-600 hover:text-white text-sm font-semibold rounded-lg transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              >
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                New Task
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col relative w-full">
          {children}
        </main>

      </body>
    </html>
  );
}
