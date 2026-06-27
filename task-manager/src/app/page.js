//-------------------------------------------------------------------------------------------
// Component: HomePage
// Purpose: Entry Point of the app. Renders TaskBoard inside a centered layout
// This file stays a Server Component it has no interactivity and incurs zero client JS cost
// Type: Server Component (default in Next.js App Router)
//-------------------------------------------------------------------------------------------

import TaskBoard from '@/components/TaskBoard';
export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 py-10 px-4">
      <h1 className="text-4xl font-extrabold text-center text-purple-700 mb-8 tracking-tight">
        ✅ My Task Manager
      </h1>
      <TaskBoard />
    </main>
  );
}