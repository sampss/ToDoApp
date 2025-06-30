# 🧩 Module: ToDoApp

A task management app designed to function as a modular standalone or plug-and-play component of the larger ManageApp ecosystem.

---

## 📄 File: /shared/types/Task.ts

### 🔍 Description
Defines the `Task` interface used across UI, database, and logic layers for consistency and type safety.

---

## 📦 Interfaces & Types

### `Task`

| Field         | Type      | Description                                                  |
|---------------|-----------|--------------------------------------------------------------|
| `id`          | number    | Unique task identifier (SQLite AUTOINCREMENT or `Date.now()`)|
| `title`       | string    | Descriptive task title                                       |
| `completed`   | boolean   | Whether the task is complete                                 |
| `createdAt`   | string    | ISO timestamp when task was created                          |
| `completeBy?` | string    | *(Optional)* ISO timestamp representing due date             |

---

## 📄 File: /modules/tasks/TaskListScreen.tsx

### 🔍 Description
Primary UI screen that manages state, renders task list, and handles task addition via `AddTask`.

### 🔑 Exports & Functions

- `TaskListScreen`: React component
  - Renders `FlatList` of `TaskCard`s
  - Consumes `AddTask` for new input
  - Creates `createdAt` using `new Date().toISOString()`

### Depends On

- `AddTask.tsx`, `TaskCard.tsx`
- `Task` from shared types
- Local UI state with `useState`

---

## 📄 File: /modules/tasks/AddTask.tsx

### 🔍 Description
Form interface for creating new tasks. Includes optional due date via `DateTimePicker`.

### 🔑 Exports & Functions

- `AddTask`: React component
  - Props: `onAdd(title: string, completeBy?: string)`
  - Inputs:
    - `TextInput` for title
    - `DateTimePicker` for due date
  - Returns: invokes callback to parent with constructed task data

---

## 📄 File: /shared/components/TaskCard.tsx

### 🔍 Description
Reusable visual card for displaying a task’s title, timestamps, and overdue indicator.

### 🔑 Fields Used

- `title`: Displayed as primary task content
- `completed`: Renders ✅ or ⬜️
- `createdAt`: Formatted using `formatDate()`
- `completeBy`: Highlighted if overdue
- Conditional styling for red text on late tasks

---

## 📄 File: /shared/utils/dateUtils.ts

### 🔍 Description
Formats ISO timestamp strings into human-readable `Month Day, Year` format using `toLocaleDateString`.

### 🔑 Function

- `formatDate(dateStr?: string): string`
  - Returns formatted date (e.g., `June 29, 2025`)
  - Gracefully handles `undefined` or invalid values

### Used In

- `TaskCard.tsx` for `createdAt` and `completeBy`

---

## 📄 File: /database/TaskDB.ts

### 🔍 Description
Handles task persistence using SQLite via `react-native-sqlite-storage`.

### 🔑 Functions

- `openDB()`: Initializes DB and creates `tasks` table
- `addTask(title, completeBy?)`:  
  - Stores `title`, `createdAt`, and optional `completeBy`
  - Returns constructed `Task`
- `getAllTasks()`:  
  - Returns sorted list of `Task[]` by `createdAt DESC`

### SQLite Schema

| Column       | Type     | Details                                         |
|--------------|----------|--------------------------------------------------|
| `id`         | INTEGER  | Primary key, auto-increment                     |
| `title`      | TEXT     | Task description                                |
| `completed`  | INTEGER  | 0 (incomplete) or 1 (complete)                   |
| `createdAt`  | TEXT     | ISO string generated at insertion               |
| `completeBy` | TEXT     | ISO string or NULL (optional due date)          |

---

## 🧰 Shared Principles

- All timestamps stored as ISO 8601 for safe cross-platform parsing
- All formatting delegated to shared utility to prevent code repetition
- TypeScript types enforced across DB, UI, and state layers
- Modular folder structure ready for seamless integration into `ManageApp`

---

## 📁 Located In

`/apps/ToDoApp/`

---

## 🧪 Notes / Dev Tips

- Use `formatDate()` for all date displays to avoid parsing issues on Hermes
- For toggle-complete, update schema/UI with `UPDATE` logic
- For standalone builds, ensure `/shared/` is copied or linked into the bundle