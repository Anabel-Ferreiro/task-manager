// ------------------------------------------------------
// COMPONENT: TaskList
// PURPOSE: Renders the filtered list of tasks. Receives the already-filtered tasks array from TaskBoard
// and maps each one to a TaskCard component.
// TYPE: Client Component ('use client') — passes callbacks
// PROPS:
// tasks — array of task objects to display
// onToggle — callback passed down to each TaskCard
// onDelete — callback passed down to each TaskCard
// ------------------------------------------------------
'use client';
import TaskCard from './TaskCard';

export default function TaskList({ tasks, onToggle, onDelete }) {

  // Conditional render: if the filtered list is empty,show a friendly message instead of an empty list.
  
  if (tasks.length === 0) {
    return (
      <p className="text-center text-purple-300 py-8 text-lg">
        No tasks here! 🎉
      </p>
    );
  }

  return (
    // ul is semantic HTML for a list of items. divide-y adds a border between each list item automatically.
    <ul className="divide-y divide-purple-100">
      {/* .map() turns the tasks array into JSX elements.
          key={task.id} is required — React uses it to track
          which items changed, were added, or were removed.
          Use the unique id (not the array index) because
          index-as-key causes bugs when items are reordered. */}
      {tasks.map((task) => (
        <li key={task.id}>
          {/* Each TaskCard receives its own data and the
              callbacks from TaskBoard via TaskList.
              TaskList doesn't own these callbacks, it just
              passes them through (prop drilling). */}
          <TaskCard
            id={task.id}
            title={task.title}
            done={task.done}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        </li>
      ))}
    </ul>
  );
}