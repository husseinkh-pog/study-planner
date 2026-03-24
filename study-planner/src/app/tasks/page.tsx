"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await fetch('/api/tasks');
        const data = await res.json();
        setTasks(data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTasks();
  }, []);

  const toggleTaskCompletion = async (taskId: number, currentStatus: boolean) => {
    try {
      // Optimistic update
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.id === taskId ? { ...t, completed: !currentStatus } : t
        )
      );

      const res = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !currentStatus }),
      });

      if (!res.ok) {
        throw new Error('Failed to update task on server');
      }
    } catch (error) {
      console.error(error);
      // Revert optimistic update on error
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.id === taskId ? { ...t, completed: currentStatus } : t
        )
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 sm:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link href="/" className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center mb-2 transition-colors">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Back to Home
            </Link>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Your Tasks</h1>
            <p className="text-slate-500 mt-2 text-lg">Manage your assignments and deadlines effortlessly.</p>
          </div>
          <Link href="/tasks/new" className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 w-fit">
            + New Task
          </Link>
        </header>

        <main>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-indigo-600">
              <svg className="animate-spin h-10 w-10 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="font-semibold animate-pulse">Loading your tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-12 text-center flex flex-col items-center">
              <p className="text-xl font-medium text-slate-900 mb-1">No tasks found</p>
              <p className="text-slate-500">You don't have any pending assignments.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task) => (
                <div 
                  key={task.id} 
                  className="bg-white rounded-3xl shadow-sm border border-slate-200 p-7 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative overflow-hidden group"
                >
                  <div className={`absolute top-0 left-0 right-0 h-1.5 ${
                      task.completed 
                        ? 'bg-emerald-400' 
                        : task.priority === 'high'
                        ? 'bg-rose-500'
                        : task.priority === 'medium'
                        ? 'bg-amber-400'
                        : 'bg-indigo-400'
                  }`}></div>

                  <div className="flex justify-between items-start mb-5 pt-2">
                    <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg border ${
                      task.completed 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                        : task.priority === 'high'
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                    }`}>
                      {task.completed ? 'Completed' : task.priority === 'high' ? 'High Priority' : 'Pending'}
                    </span>
                    
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                      {task.subject || task.course || 'General'}
                    </span>
                  </div>
                  
                  <h3 className={`text-2xl font-bold group-hover:text-indigo-600 transition-colors mb-3 leading-tight ${
                    task.completed ? 'text-slate-400 line-through' : 'text-slate-900'
                  }`}>
                    {task.title}
                  </h3>
                  
                  {task.description && (
                    <p className="text-slate-500 text-sm mb-6 flex-grow leading-relaxed">
                      {task.description}
                    </p>
                  )}
                  
                  <div className="pt-5 mt-auto border-t border-slate-100 flex items-center justify-between text-sm text-slate-600 font-medium">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {task.dueDate}
                    </div>
                    
                    <button
                      onClick={() => toggleTaskCompletion(task.id, task.completed)}
                      className={`flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        task.completed 
                          ? 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700' 
                          : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                      }`}
                    >
                      {task.completed ? (
                        <>
                          <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Undo
                        </>
                      ) : (
                        <>
                          <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Mark Complete
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
