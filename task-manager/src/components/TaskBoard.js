//----------------------------------------------------------------------------------------------------
//Component: TaskBoard
//Purpose: The 'Brain" of the app. Has all task state and passes data down to child components as props
//Receives events back up via callback props 
//Type: Client Component- needs useState + useEffect
//-----------------------------------------------------------------------------------------------------
'use client';
import { useState, useEffect } from 'react';
import TaskStats from './TaskStats';
import AddTaskForm from './AddTaskForm';
import TaskList from './TaskList';

export default function TaskBoard() {
    // ----------STATE --------------------------------------
  // tasks lives in state because changes to it must trigger, a re-render so the UI stays in sync with the data.
  // start with [] and load from localStorage in useEffect to avoid a hydration mismatch (server renders [] too).
  const [tasks, setTasks] = useState([]);
  
  // filter is independent from tasks — they change at different times for different reasons, so they each
  // get their own useState call instead of being combined.
  const [filter, setFilter] = useState('all');
  
  // -----------EFFECT: Load from localStorage on mount ----------------
  // Runs once on client mount (empty dependency array []). Can't read localStorage in useState directly because
  // Next.js pre-renders on the server where localStorage doesn't exist. This useEffect only runs in the browser.

  useEffect(() => {
    const saved = localStorage.getItem('tasks');
    setTasks(saved ? JSON.parse(saved) : [
      { id: 't1', title: 'Buy groceries', done: false },
      { id: 't2', title: 'Finish homework', done: false },
      { id: 't3', title: 'Call mom', done: false },
    ]);
  }, []);
  
  // ----------EFFECT: Persist to localStorage ------------------
  // Runs after every render where tasks changed. [tasks] dependency array means: skip if tasks didn't change.
  // This syncs React state with the browser's localStorage, so tasks survive a page refresh.
  useEffect(() => {
    if (tasks.length === 0) return;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // ----------- EFFECT: Update browser tab title -----------------
  // Syncs document.title with the number of active tasks. Cleanup function resets the title when component unmounts.
  useEffect(() => {
    const active = tasks.filter((t) => !t.done).length;
    document.title = `${active} tasks remaining`;
    return () => { document.title = 'My Task Manager'; };
  }, [tasks]);

  // ---------DERIVED VALUES --------------------------
  // These are computed fresh on every render from tasks. Storing them as separate state would cause duplication
  // bugs, if tasks updates but the counter doesn't, the UI would show wrong numbers.
  const completed = tasks.filter((t) => t.done).length;
  const active = tasks.length - completed;

  // visible is derived from both tasks and filter, it doesn't need its own state, just recalculates each render.
  const visible =
    filter === 'all' ? tasks :
    filter === 'done' ? tasks.filter((t) => t.done) :
    tasks.filter((t) => !t.done);

  // -----------HANDLERS -----------------
  // These are passed DOWN to children as callback props. TaskBoard owns the state so it must own the handlers.
  // Children never modify state directly, they call these.

  // .map() returns a NEW array — React compares references, so mutating the existing array would skip the re-render.
  function handleToggle(id) {
    setTasks(tasks.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    ));
  }

  // .filter() returns a NEW array without the deleted task.
  // Direct mutation (splice) would not trigger a re-render.
  function handleDelete(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  // Spread [...tasks] creates a new array with the new task, appended. crypto.randomUUID() gives a unique stable id.
  function handleAdd(title) {
    const newTask = { id: crypto.randomUUID(), title, done: false };
    setTasks([...tasks, newTask]);
  }

  // .filter() keeps only incomplete tasks — removes all done ones.
  function handleClearDone() {
    setTasks(tasks.filter((t) => !t.done));
  }

  // ---------RENDER -------------------------
  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl p-8">

      {/* TaskStats is a sibling to TaskList, both need task counts.
          State is lifted to TaskBoard so both can share it. */}
      <TaskStats
        total={tasks.length}
        completed={completed}
        active={active}
        onClearCompleted={handleClearDone}
      />

      {/* AddTaskForm only needs to signal upward via onAdd.
          It does not need access to the full tasks array. */}
      <AddTaskForm onAdd={handleAdd} />

      {/* Filter buttons, clicking sets filter state in TaskBoard.
          The active filter gets a filled purple background. */}
      <div className="flex gap-2 mb-6">
        {['all', 'active', 'done'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold capitalize transition-colors ${
              filter === f
                ? 'bg-purple-600 text-white'
                : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* TaskList receives the already-filtered visible array.
          onToggle and onDelete bubble back up to TaskBoard. */}
      <TaskList
        tasks={visible}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </div>
  );
}