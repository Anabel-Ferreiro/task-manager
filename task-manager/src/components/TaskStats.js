// ------------------------------------------------------------
// COMPONENT: TaskStats
// PURPOSE: Displays a live summary of task counts and a button to clear all completed tasks at once.
// Receives all data as props from TaskBoard, it owns no state of its own. This is a 'sibling' to TaskList;
// both need task counts so state is lifted to TaskBoard.
// TYPE: Client Component ('use client') — needs onClick
// PROPS:
// total — total number of tasks in the list
// completed — number of tasks where done === true
// active — number of tasks where done === false
// onClearCompleted — callback fired when user clicks Clear
// -------------------------------------------------------------------------

'use client';

export default function TaskStats({ total, completed, active, onClearCompleted }) {
  return (
    // Stats bar sits above the form and task list.
    // flex + justify-between puts counts on left, button on right.
    <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl">

      {/* Derived values passed as props from TaskBoard.
          These update automatically whenever tasks state changes
          because TaskBoard re-renders and passes new values down. */}
      <div className="flex gap-4 text-sm">
        <span>
          <span className="font-bold text-purple-700 text-lg">{total}</span>
          <span className="text-purple-500 ml-1">total</span>
        </span>
        <span>
          {/* Conditional render: green when there are active tasks,
              gray when there are none. */}
          <span className={`font-bold text-lg ${active > 0 ? 'text-green-600' : 'text-gray-400'}`}>
            {active}
          </span>
          <span className="text-purple-500 ml-1">active</span>
        </span>
        <span>
          {/* Conditional render: pink when tasks are completed,
              gray when none are done yet. */}
          <span className={`font-bold text-lg ${completed > 0 ? 'text-pink-600' : 'text-gray-400'}`}>
            {completed}
          </span>
          <span className="text-purple-500 ml-1">done</span>
        </span>
      </div>

      {/* Clear completed button: fires onClearCompleted callback.
          TaskBoard receives it and filters out all done tasks.
          Conditional render: only show when there are completed tasks. */}
      {completed > 0 && (
        <button
          onClick={onClearCompleted}
          className="text-xs font-semibold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-full transition-colors"
        >
          Clear completed 🗑️
        </button>
      )}
    </div>
  );
}