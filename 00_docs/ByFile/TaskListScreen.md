**Path:** modules/screens/TaskListScreen.tsx

## Overview
TaskListScreen serves as the primary task interaction interface. It renders a searchable and editable list of tasks, allowing users to input new task titles, select completed tasks, and trigger archiving via a customizable button. The screen connects UI components with business logic from shared services, forming the core flow of the task management module.

## Internal Components
- `SearchInput`  
  A flexible text input that supports both task title entry and real-time filtering of existing tasks. It enhances UX by combining input creation and dynamic search in one field.

- `NameRow`  
  Displays a descriptive section header above the list (e.g. "Your Tasks" or "Active Items"). Styled for visual structure and accessibility.

- `TaskCard`  
  Visual block for individual tasks. Shows task title, completion status, and selection toggle. Supports long-press or checkbox-style interaction.

- `ArchiveButton`  
  A modular action button allowing users to archive all completed tasks. Highly customizable via props for label, icons, colors, and layout.

## External Connections

- `@components/TaskCard`  
  Renders each task with styling and interaction logic.

- `@components/ArchiveButton`  
  Provides the layout, color, and press behavior for archiving actions.

- `@services/ArchiveService`  
  Executes core archiving logic, writing tasks to an archive store and removing them from active lists.

- `@utils/filterTasks`  
  Filters tasks dynamically based on user input in the SearchInput field.

- `@typesafe/TaskTypes`  
  Defines the shape of task objects, including required fields like `title`, `completed`, and optional metadata.

- `react-native` (`FlatList`, `useState`, `useEffect`)  
  Powers list rendering, local state tracking, and lifecycle handling.

## Future Development
- Rename to `TaskListScreen01` to reflect alignment with `ButtonTemplate01`
- Support drag-to-select or long-press batch actions
- Add real-time sync with remote DB or offline caching
- Integrate archive status drawer to view hidden items
- Hook into undo/redo service for task recovery