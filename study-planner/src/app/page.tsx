import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-slate-50 flex items-center justify-center p-6 sm:p-12">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -ml-[300px] w-[600px] h-[600px] rounded-full bg-indigo-200/40 blur-3xl mix-blend-multiply opacity-70 animate-pulse"></div>
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-cyan-200/40 blur-3xl mix-blend-multiply opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute -bottom-32 left-1/3 w-[600px] h-[600px] rounded-full bg-purple-200/40 blur-3xl mix-blend-multiply opacity-70 animate-pulse" style={{ animationDelay: '4s' }}></div>

      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center text-center space-y-10 bg-white/60 backdrop-blur-xl p-10 md:p-16 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60">
        <div className="space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100/50">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
            <span className="text-sm font-medium text-indigo-800 tracking-wide">Next Generation Study Planner</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
            Unlock your full <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500">academic potential</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
            Stay organized, manage deadlines effortlessly, and conquer your assignments. A beautiful, distraction-free workspace designed exclusively for brilliant students.
          </p>
        </div>
        
        <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link 
            href="/tasks" 
            className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 bg-indigo-600 rounded-full hover:bg-indigo-700 hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
          >
            <span className="mr-2">Go to Tasks</span>
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
          
          <a
            href="https://github.com/study-planner"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 font-semibold text-slate-700 transition-all duration-300 bg-white border border-slate-200 rounded-full hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-200"
          >
            Learn More
          </a>
        </div>
      </div>
    </main>
  );
}
