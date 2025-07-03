**Path:** modules/tasks/AddTask.tsx

## Overview
AddTask provides the task creation logic. Used primarily alongside SearchInput to convert new entries into actionable tasks.

## Internal Components
- `textInputValue`  
  Tracks current user input  
- `submitTask()`  
  Converts text to task object and appends to the active list  

## External Connections
- `@typesafe/TaskTypes` – Generates task objects  
- `@components/SearchInput` – Shares UI space and input control  
- `@utils/generateId` – Optionally assigns unique IDs

## Future Development
- Rename to `ButtonTemplate01AddLogic`  
- Add validations (empty, duplicate, length)  
- Support voice-to-text integration  
- Hook into DB writer to persist new tasks  