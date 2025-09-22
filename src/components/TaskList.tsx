import { Box } from '@mui/material';

type TaskListProps = {
  header?: React.ReactNode;
};
 
export default function TaskList({
  header, 
  children,
}: React.PropsWithChildren<TaskListProps>) {
  return (
    <Box>
      {header}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {children}
      </Box>
    </Box>
  );
}