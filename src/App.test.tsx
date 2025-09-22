import { describe, expect, test } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

describe('App', () => {
  test('should render input field and add button', () => {
    render(<App />);
    const input = screen.getByRole('textbox', { name: /add a new task/i });
    const button = screen.getByRole('button', { name: /add task/i });
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('should add task to list when add button is clicked', async () => {
    const user = userEvent.setup();

    render(<App />);
    const input = screen.getByRole('textbox', { name: /add a new task/i });
    const button = screen.getByRole('button', { name: /add task/i });

    await user.type(input, 'New Task');
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('New Task')).toBeInTheDocument();
    });
  });

  test('should clear the input field after adding a task', async () => {
    const user = userEvent.setup();
    render(<App />);
 
    const input = screen.getByRole('textbox', { name: /add a new task/i });
    const button = screen.getByRole('button', { name: /add task/i });
 
    await user.type(input, 'New Task');
    await user.click(button);
 
    await waitFor(() => {
      expect(input).toHaveValue('');
    });
  }); 
 
  test('should not add an empty task', async () => {
    const user = userEvent.setup();
    render(<App />);
 
    const input = screen.getByRole('textbox', { name: /add a new task/i });
    const button = screen.getByRole('button', { name: /add task/i });
 
    await user.type(input, '   '); // Makes sense to also test with spaces
    await user.click(button);
 
    await waitFor(() => {
      // Since we're using Cards now instead of list items, check for task text
      expect(screen.queryByText('   ')).not.toBeInTheDocument();
    });
  }); 
 
  test('should add a task by pressing the enter key', async () => {
    const user = userEvent.setup();
    render(<App />);
 
    const input = screen.getByRole('textbox', { name: /add a new task/i });
 
    await user.type(input, 'Enter Key Task{enter}');
 
    await waitFor(() => {
      expect(screen.getByText('Enter Key Task')).toBeInTheDocument();
    });
  });

  test('should toggle task completion', async () => {
    const user = userEvent.setup();
    render(<App />);
 
    const input = screen.getByRole('textbox', { name: /add a new task/i });
    const button = screen.getByRole('button', { name: /add task/i });
 
    await user.type(input, 'Unique Toggle Task 123');
    await user.click(button);
 
    await waitFor(() => {
      expect(screen.getByText('Unique Toggle Task 123')).toBeInTheDocument();
    });

    // Find the task card that contains our specific task
    const taskCard = screen.getByText('Unique Toggle Task 123').closest('div[class*="MuiCard-root"]');
    expect(taskCard).toBeInTheDocument();
    
    // Find the toggle button within this specific card
    const toggleButton = taskCard?.querySelector('button[aria-label*="Mark as complete"]');
    expect(toggleButton).toBeInTheDocument();
    
    await user.click(toggleButton!);

    await waitFor(() => {
      // Check for the completed chip within the task card
      const taskCard = screen.getByText('Unique Toggle Task 123').closest('div[class*="MuiCard-root"]');
      const completedChip = taskCard?.querySelector('span[class*="MuiChip-label"]');
      expect(completedChip).toHaveTextContent('Completed');
    });
  });

  test('should delete a task', async () => {
    const user = userEvent.setup();
    render(<App />);
 
    const input = screen.getByRole('textbox', { name: /add a new task/i });
    const button = screen.getByRole('button', { name: /add task/i });
 
    await user.type(input, 'Unique Delete Task 456');
    await user.click(button);
 
    await waitFor(() => {
      expect(screen.getByText('Unique Delete Task 456')).toBeInTheDocument();
    });

    // Find the task card that contains our specific task
    const taskCard = screen.getByText('Unique Delete Task 456').closest('div[class*="MuiCard-root"]');
    expect(taskCard).toBeInTheDocument();
    
    // Find the delete button within this specific card
    const deleteButton = taskCard?.querySelector('button[aria-label="Delete task"]');
    expect(deleteButton).toBeInTheDocument();
    
    await user.click(deleteButton!);

    await waitFor(() => {
      expect(screen.queryByText('Unique Delete Task 456')).not.toBeInTheDocument();
    });
  });
});
