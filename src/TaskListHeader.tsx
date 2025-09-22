import { Typography, Box, Chip } from '@mui/material';

type TaskListHeaderProps = {
  label: string;
  count: number;
};
 
export default function TaskListHeader({ count, label }: TaskListHeaderProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
      <Typography variant="h5" component="h2" color="primary" sx={{ fontWeight: 600 }}>
        {label}
      </Typography>
      <Chip 
        label={count} 
        color={label === 'Pending' ? 'warning' : 'success'}
        variant="filled"
        sx={{ fontWeight: 'bold' }}
      />
    </Box>
  );
}