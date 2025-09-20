import React from 'react';
import type { Task } from './types'; 
import  AddTask from './AddTask';
import TaskList from './TaskList'; 
import TaskListItem from './TaskListItem';
import TaskListHeader from './TaskListHeader';

const STORAGE_KEY = 'todo-app-tasks';

function App() {
  const [tasks, setTasks] = React.useState<Task[]>(() => {
    const saved_tasks = localStorage.getItem(STORAGE_KEY);
    if (saved_tasks) {
        const parsed = JSON.parse(saved_tasks);
        return parsed.map((task: any) => ({
            ...task,
            createdAt: new Date(task.createdAt),
            completedAt: task.completedAt ? new Date(task.completedAt) : undefined,
        }));
    }
    return [];
  });

  React.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);  

  const onAddTask = (taskName: string) => {
    setTasks([
      ...tasks,
      {
        id: new Date().getTime(), // Not a great way to generate IDs
        title: taskName,
        isCompleted: false,
        createdAt: new Date(),
      },
    ]);
  };

  const toggleComplete = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { 
            ...task, 
            isCompleted: !task.isCompleted,
            completedAt: !task.isCompleted ? new Date() : undefined
          }
        : task
    ));
  };

  return (
    <div>
      <h1>Tasks</h1>
      <AddTask onAddTask={onAddTask} />
      <TaskList>
        <TaskListHeader count={tasks.length} />
        {tasks.map((task) => (
          <TaskListItem key={task.id} task={task} onToggleComplete={toggleComplete} />
        ))}
      </TaskList>
    </div>
  );
}

export default App;
