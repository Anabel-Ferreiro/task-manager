// ------------------------------------------------------
// COMPONENT: TaskCard
// PURPOSE: Displays a single task item with toggle and delete buttons. Receives task data from TaskList
// and fires callbacks back up to TaskBoard.
// TYPE: Client Component ('use client') — needs onClick
// PROPS:
// id — unique task identifier (from crypto.randomUUID)
// title — the task text typed by the user
// done — boolean; true means the task is complete
// onToggle — callback fired with id when user clicks Toggle
// onDelete — callback fired with id when user clicks Delete
// -------------------------------------------------------------
'use client';

export default function TaskCard({ id, title, done, onToggle, onDelete }) {

  // Conditional render using a ternary operator. The className changes based on done so the user can see
  // at a glance which tasks are complete.
  // done=true → line-through and faded text
  // done=false → bold dark text
  const textClass = done
    ? 'line-through text-purple-300 font-normal'
    : 'text-purple-900 font-semibold';

  return (
    // flex layout puts the task title on the left and the buttons on the right side.
    <div className={`flex items-center justify-between gap-3 p-4 rounded-2xl mb-2 transition-colors ${
      done ? 'bg-purple-50' : 'bg-white border border-purple-100'
    }`}>

      {/* Conditional render: show a checkmark emoji when done.
          This gives instant visual feedback to the user. */}
      <span className={`flex-1 text-sm ${textClass}`}>
        {done && '✅ '}{title}
      </span>

      <div className="flex gap-2">
        {/* Toggle button: calls onToggle with THIS task's id.
            TaskBoard receives it and flips done with .map().
            The data flows UP through the callback prop. */}
        <button
          onClick={() => onToggle(id)}
          className={`text-xs px-3 py-1 rounded-full font-semibold transition-colors ${
            done
              ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
              : 'bg-green-100 text-green-700 hover:bg-green-200'
          }`}
        >
          {/* Conditional render: button label changes based on done */}
          {done ? 'Undo' : 'Done'}
        </button>

        {/* Delete button: calls onDelete so TaskBoard can
            remove this task from state using .filter(). */}
        <button
          onClick={() => onDelete(id)}
          className="text-xs px-3 py-1 rounded-full font-semibold bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}