import React from "react";
import { TextField, Button, Box } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

type AddTaskProps = {
    onAddTask: (taskName: string) => void;
};
 
export default function AddTask({  
  onAddTask,
}: AddTaskProps) {
  const [taskName, setTaskName] = React.useState(''); 

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    const trimmedTaskName = taskName.trim();
 
    if (!trimmedTaskName) {
      return;
    }
 
    onAddTask(trimmedTaskName);
    setTaskName('');
  };

  return (
    <Box component="form" onSubmit={handleAddTask} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
      <TextField
        fullWidth
        label="Add a new task"
        variant="outlined"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        required
        placeholder="Enter your task here..."
      />
      <Button
        type="submit"
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ height: '56px', minWidth: '120px' }}
      >
        Add Task
      </Button>
    </Box>
  );
}