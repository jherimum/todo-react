import type { Task } from './types';

interface TaskListItemProps {
  task: Task;
  onToggleComplete: (id: number) => void;
}

export default function TaskListItem({ task, onToggleComplete }: TaskListItemProps) {
  return (
    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      
      <span style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
        {task.title}
      </span>

      <button 
        onClick={() => onToggleComplete(task.id)}
        style={{
          padding: '4px 8px',
          backgroundColor: task.isCompleted ? '#4CAF50' : '#f0f0f0',
          color: task.isCompleted ? 'white' : 'black',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        {task.isCompleted ? '✓' : '○'}
      </button>
    </li>
  );
}