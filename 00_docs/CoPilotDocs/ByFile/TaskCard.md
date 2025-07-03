**Path:** shared/components/TaskCard.tsx

## Overview
TaskCard visually renders a single task with title, status, and completion indicator. It is interactive, allowing toggling and selection for batch actions.

## Internal Components
- `Checkbox/Icon`  
  Represents whether the task is completed

- `Text Label`  
  Displays the task title or short description

- `Container View`  
  Styles the card with padding, shadow, or visual grouping

## External Connections
- `@typesafe/TaskTypes` – Supplies expected shape of task objects  
- `@utils/useSelection` – Tracks selection logic for archiving  
- `react-native-gesture-handler` – Optional support for swipes or long-press

## Future Development
- Rename to `ButtonTemplate01ItemCard`  
- Add priority indicators or badges  
- Support inline editing or click-to-focus  
- Convert to touch-friendly block for mobile gestures
- add more in depth card fields able to be opened and edited, using pencil icon / details link  