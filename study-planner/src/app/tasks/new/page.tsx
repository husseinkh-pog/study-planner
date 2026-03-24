"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewTaskPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    dueDate: '',
    subject: '',
    priority: 'medium',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          completed: false, // newly created tasks begin as pending
        }),
      });
      
      if (res.ok) {
        router.push('/tasks');
        router.refresh(); 
      } else {
        console.error('Failed to create task:', await res.text());
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error submitting task:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 sm:p-12">
      <div className="max-w-2xl mx-auto space-y-8">
        <header>
          <Link href="/tasks" className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center mb-4 transition-colors w-fit">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Tasks
          </Link>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Create New Task</h1>
          <p className="text-slate-500 mt-2 text-lg">Add a new assignment to your planner.</p>
        </header>

        <main className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-semibold text-slate-700">Task Title <span className="text-rose-500">*</span></label>
              <input 
                type="text" 
                id="title" 
                name="title" 
                required 
                value={formData.title} 
                onChange={handleChange}
                placeholder="e.g. Calculus Midterm Study"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-all outline-none text-slate-900 placeholder:text-slate-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="dueDate" className="block text-sm font-semibold text-slate-700">Due Date <span className="text-rose-500">*</span></label>
                <input 
                  type="date" 
                  id="dueDate" 
                  name="dueDate" 
                  required 
                  value={formData.dueDate} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-all outline-none text-slate-900"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-semibold text-slate-700">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleChange}
                  placeholder="e.g. MATH 301"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-all outline-none text-slate-900 placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="priority" className="block text-sm font-semibold text-slate-700">Priority</label>
              <div className="relative">
                <select 
                  id="priority" 
                  name="priority" 
                  value={formData.priority} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-all outline-none text-slate-900 appearance-none bg-white"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-4">
              <Link href="/tasks" className="px-6 py-3 text-slate-600 font-medium hover:text-slate-900 transition-colors">
                Cancel
              </Link>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : 'Save Task'}
              </button>
            </div>
            
          </form>
        </main>
      </div>
    </div>
  );
}
