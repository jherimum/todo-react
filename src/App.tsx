import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container, Typography, Box, Paper } from '@mui/material';
import type { Task } from './types'; 
import  AddTask from './AddTask';
import TaskList from './TaskList'; 
import TaskListItem from './TaskListItem';
import TaskListHeader from './TaskListHeader';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

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

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const incompleteTasks = tasks.filter(task => !task.isCompleted);
  const completedTasks = tasks.filter(task => task.isCompleted);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center" color="primary">
            My Todo App
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
            Total tasks: {tasks.length}
          </Typography>
          
          <Box sx={{ mb: 4 }}>
            <AddTask onAddTask={onAddTask} />
          </Box>
          
          <Box sx={{ mb: 4 }}>
            <TaskList>
              <TaskListHeader label="Pending" count={incompleteTasks.length} />
              {incompleteTasks.map((task) => (
                <TaskListItem key={task.id} task={task} onToggleComplete={toggleComplete} onDelete={deleteTask} />
              ))}
            </TaskList>
          </Box>
          
          {completedTasks.length > 0 && (
            <Box>
              <TaskList>
                <TaskListHeader label="Completed" count={completedTasks.length} />
                {completedTasks.map((task) => (
                  <TaskListItem key={task.id} task={task} onToggleComplete={toggleComplete} onDelete={deleteTask} />
                ))}
              </TaskList>
            </Box>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
