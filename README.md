
# Todo App

A modern, responsive todo application built with React, TypeScript, and Material-UI. Features a clean interface with task management capabilities including adding, completing, deleting tasks, and persistent localStorage storage.

## Features

- ✅ Add new tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Delete tasks
- ✅ Separate pending and completed task sections
- ✅ Persistent storage with localStorage
- ✅ Responsive Material-UI design
- ✅ Smooth animations and hover effects
- ✅ Accessibility-friendly interface

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Material-UI (MUI)** - Component library and theming
- **Vite** - Build tool and development server
- **Vitest** - Testing framework
- **Docker** - Containerization

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Docker (optional, for containerized deployment)

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd todo-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Available Scripts

### Development

```bash
# Start development server
npm run dev

# Run tests
npm test

# Run linting
npm run lint
```

### Production

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Docker Deployment

### Build and run with Docker

```bash
# Build the Docker image
docker build -t todo-app .

# Run the container
docker run -d -p 3000:80 --name todo-app-container todo-app
```

The app will be available at `http://localhost:3000`

### Stop the container

```bash
docker stop todo-app-container
docker rm todo-app-container
```

## Project Structure

```
src/
├── components/           # Reusable components
│   ├── AddTask.tsx      # Add new task form
│   ├── TaskList.tsx     # Task list container
│   ├── TaskListHeader.tsx # Section headers with counts
│   └── TaskListItem.tsx # Individual task item
├── App.tsx              # Main application component
├── App.test.tsx         # Application tests
├── types.ts             # TypeScript type definitions
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## Testing

The app includes comprehensive tests covering:

- Component rendering
- User interactions
- Task management functionality
- Form validation

Run tests with:

```bash
npm test
```

## Docker Configuration

The app uses a multi-stage Docker build:

1. **Build stage**: Compiles the React app using Node.js
2. **Production stage**: Serves static files using Nginx

This approach results in a lightweight production image optimized for performance.
