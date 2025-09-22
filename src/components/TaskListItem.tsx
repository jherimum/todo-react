import { Card, CardContent, Typography, IconButton, Box, Chip } from '@mui/material';
import { CheckCircle, RadioButtonUnchecked, Delete } from '@mui/icons-material';
import type { Task } from '../types';

interface TaskListItemProps {
  task: Task;
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TaskListItem({ task, onToggleComplete, onDelete }: TaskListItemProps) {
  return (
    <Card 
      elevation={2} 
      sx={{ 
        mb: 2, 
        transition: 'all 0.3s ease',
        '&:hover': { elevation: 4, transform: 'translateY(-2px)' },
        opacity: task.isCompleted ? 0.7 : 1
      }}
    >
      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2 }}>
        <IconButton 
          onClick={() => onToggleComplete(task.id)}
          color={task.isCompleted ? 'success' : 'default'}
          sx={{ '&:hover': { transform: 'scale(1.1)' } }}
          aria-label={task.isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {task.isCompleted ? <CheckCircle /> : <RadioButtonUnchecked />}
        </IconButton>
        
        <Box sx={{ flex: 1 }}>
          <Typography 
            variant="body1" 
            sx={{ 
              textDecoration: task.isCompleted ? 'line-through' : 'none',
              color: task.isCompleted ? 'text.secondary' : 'text.primary'
            }}
          >
            {task.title}
          </Typography>
          {task.isCompleted && (
            <Chip 
              label="Completed" 
              size="small" 
              color="success" 
              variant="outlined"
              sx={{ mt: 1 }}
            />
          )}
        </Box>

        <IconButton 
          onClick={() => onDelete(task.id)}
          color="error"
          sx={{ 
            '&:hover': { 
              transform: 'scale(1.1)',
              backgroundColor: 'error.light',
              color: 'white'
            } 
          }}
          aria-label="Delete task"
        >
          <Delete />
        </IconButton>
      </CardContent>
    </Card>
  );
}