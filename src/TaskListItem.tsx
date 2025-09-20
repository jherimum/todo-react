import type { Task } from './types';

interface TaskListItemProps {
  task: Task;
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TaskListItem({ task, onToggleComplete, onDelete }: TaskListItemProps) {
  return (
    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      
      <span style={{ textDecoration: task.isCompleted ? 'line-through' : 'none', flex: 1 }}>
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

      <button 
        onClick={() => onDelete(task.id)}
        style={{
          padding: '4px 8px',
          backgroundColor: '#ff4444',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        ×
      </button>
    </li>
  );
}