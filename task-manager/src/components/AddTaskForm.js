// ------------------------------------------------------------
// COMPONENT: AddTaskForm
// PURPOSE: Controlled form that lets the user type a new task title and submit it. Doesn't own the task
// list, it only signals upward via onAdd callback.
// PATTERN: Controlled component, input value lives in state.
// TYPE: Client Component ('use client'), needs useState
// PROPS:
// onAdd — callback fired with the new task title string.
//         TaskBoard receives it and appends to tasks array.
// --------------------------------------------------------------
'use client';
import { useState } from 'react';

export default function AddTaskForm({ onAdd }) {

  // Local state: only this component needs to know what the user is currently typing. No need to lift this up
  // to TaskBoard because no sibling needs this value.
  const [title, setTitle] = useState('');

  function handleSubmit(e) {
    // e.preventDefault() stops the browser from reloading the page on form submit, the default HTML behavior.
    // Without this, the page would refresh and all state would reset.
    e.preventDefault();

    // Guard clause: reject blank or whitespace-only submissions.
    // .trim() removes leading/trailing spaces before checking.
    if (!title.trim()) return;

    // Send the trimmed title up to TaskBoard via callback prop.
    // TaskBoard owns the tasks array so it handles the actual update.
    onAdd(title.trim());

    // Reset the input field so it's ready for the next task.
    setTitle('');
  }

  return (
    // onSubmit fires when user presses Enter or clicks Add.
    // Using form onSubmit instead of button onClick also handles
    // keyboard submission — better for accessibility.
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">

      {/* Controlled input: value always mirrors state.
          onChange keeps state in sync on every keystroke.
          Without value={title}, React loses control of the input. */}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 border-2 border-purple-200 rounded-full px-4 py-2 text-sm text-purple-900 placeholder-purple-300 focus:outline-none focus:border-purple-500"
      />
      <button
        type="submit"
        className="bg-purple-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-purple-700 transition-colors"
      >
        Add ✨
      </button>
    </form>
  );
}