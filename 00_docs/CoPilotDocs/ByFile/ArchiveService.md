**Path:** modules/shared/services/ArchiveService.ts

## Overview
ArchiveService handles the business logic for archiving completed tasks. It filters the task list and writes selected items to an archive handler.

## Internal Components
- `archiveCompletedTasks()`  
  Accepts a task array, filters completed items, calls external write function

## External Connections
- Receives write function (e.g. `mockArchiveWrite`) from screen  
- Uses task models from `@typesafe/TaskTypes`  
- Logs output for developer feedback or state sync

## Future Development
- Add timestamp and task ID to archive logs  
- Support batch undo or recovery  
- Filter by task group or tag  
- Create generalized archive pattern for multiple plugins  