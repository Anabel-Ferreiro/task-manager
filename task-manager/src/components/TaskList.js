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
      {/* key={task.id} is required by React's reconciliation algorithm.
         React uses it to identify which items changed, were added,
         or removed between renders, without it, React would re-render
         the entire list on every change instead of only the affected item.
         I use task.id (not array index) because if items are reordered
         or deleted, index-as-key causes React to match the wrong elements
         and produce silent UI bugs. */}
      
      {tasks.map((task) => (
        <li key={task.id}>
          {/* Each TaskCard receives its own data and the callbacks
              from TaskBoard via TaskList.TaskBoard is the single source of truth for task state, so it must own all handlers that modify that state.
              TaskList doesn't own these callbacks, it just passes them through (prop drilling) so data flow stays top-down. */}
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