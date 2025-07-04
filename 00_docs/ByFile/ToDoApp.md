**Path:** modules/screens/ToDoApp.tsx

## Overview
ToDoApp functions as the root screen for the task management module. It coordinates task state, user actions, and interface layout. This is where tasks are displayed, added, and archived via visual components.

## Internal Components
- `SearchInput`  
  Dual-purpose input field for entering new task titles and filtering existing ones.

- `TaskCard`  
  Displays individual tasks with completion toggles and visual labels.

- `ArchiveButton`  
  Customizable action button used to archive completed tasks with flexible layout.

- `AddTask`  
  Triggers task creation flow based on text entered in the input field.

## External Connections
- `@components/TaskCard` – Handles the UI for each task entry  
- `@components/ArchiveButton` – Renders the customizable button for archiving  
- `@services/ArchiveService` – Executes logic to archive tasks  
- `@components/AddTask` – Adds new tasks to local state and triggers updates  
- `@utils/filterTasks` – Filters visible tasks based on input  
- `@typesafe/TaskTypes` – Defines task shape, used for validation and logic

## Future Development
- Rename to `ButtonTemplate01Screen` for consistency  
- Add segmented views for active, archived, and pending tasks  
- Sync with cloud-based database  
- Allow swipe-to-archive or undo actions  