**Path:** shared/components/TaskCard.tsx

## Overview
TaskCard visually renders a single task with title, status, and metadata. It supports toggling completion, viewing extended details, and deleting tasks. The layout is split into left and right columns for clarity and modular control.

## Internal Components
- `Checkbox/Icon`  
  Indicates whether the task is completed (✅ or ⬜️)

- `Text Label`  
  Displays the task title and timestamps

- `DETAILS Link`  
  Centered at the top of the card; opens a modal with full task details

- `Pencil Icon`  
  Top-right corner; opens the modal directly in edit mode

- `Trash Icon`  
  Anchored bottom-right; deletes the task

- `TaskDetailsModal`  
  External component used to view and edit task details

## External Connections
- `@typesafe/TaskTypes`  
  Defines the shape of task objects including `details`, `completeBy`, and `createdAt`

- `@utils/dateUtils`  
  Formats timestamps for display

- `@components/TaskDetailsModal`  
  Modal component for viewing/editing task metadata

## Future Development
- Rename to `ButtonTemplate01ItemCard` for consistency  
- Add priority indicators or badges  
- Support inline editing or click-to-focus  
- Convert to touch-friendly block for mobile gestures  
- Expand modal to support markdown, subtasks, or attachments  
- Add hover or press animations for icons and links