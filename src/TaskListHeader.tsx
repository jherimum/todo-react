type TaskListHeaderProps = {
  label: string;
  count: number;
};
 
export default function TaskListHeader({ count, label }: TaskListHeaderProps) {
  return <h2>{label} ({count})</h2>;
}