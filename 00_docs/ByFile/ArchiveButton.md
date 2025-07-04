**Path:** shared/components/ArchiveButton.tsx

## Overview
ArchiveButton is a reusable layout component used for submitting or triggering task-related actions. It supports icons, labels, and contextual messaging.

## Internal Components
- `centerText`  
  Displays primary label (e.g. "Archive Completed")

- `topText` / `bottomText`  
  Supplementary info above/below the button

- `leftText` / `rightText`  
  Emoji or icons flanking the button on the same row

## External Connections
- None directly, but receives `onPress` tied to service or screen logic  
- Consumes `color` prop based on app theme, passed via screen components

## Future Development
- Rename to `ButtonTemplate01` for modular reuse  
- Add preset variants (e.g. primary, warning, success)  
- Support icon font libraries  
- Animate press feedback with bounce or glow  