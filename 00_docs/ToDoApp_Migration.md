# 🔄 ToDoApp Migration Checklist

This checklist helps restructure the ToDoApp module to follow the modular architecture that supports standalone operation, master app integration, mobile-first development, and future web/backend sync.

---

## ✅ Already Solid – No Changes Needed

- [ ] `App.tsx`, `index.js` – Entry points are in place  
- [ ] `babel.config.js`, `tsconfig.json`, `metro.config.js` – Config files set up  
- [ ] `/shared/utils/` and `/shared/types/` – Existing and appropriately placed  
- [ ] `/modules/tasks/` – Feature module already initialized  
- [ ] `/00_docs/` – Contains documentation and design notes  

---

## 🧹 ToDoApp Restructure Tasks

| Task | Status |
|------|--------|
| Split `/modules/tasks` into subfolders: `components/`, `screens/`, `services/`, `types/`, `hooks/` | [ x ] |
| Move `TaskCard.tsx` from `/shared/components` → `/modules/tasks/components/` | [ x ] |
| Add `routes.ts` to define screen exports and navigation | [ x ] |
| Add `index.ts` in `/modules/tasks/` to barrel-export module | [ x ] |
| Move/add `useTasks.ts` and other hooks into `/hooks/` | [ x ] |
| Extract SQLite logic from `TaskDB.ts` into `/modules/tasks/services/TaskService.ts` | [ x ] |
| Ensure `Task.ts` lives in `/modules/tasks/types/` | [ x ] |
| Update imports across the app for new file paths | [ ] |

- index.ts, routes.ts, useTasks.ts are all blank files at the moment. 
- need to verify if any changes need made to db logic and error with sql
- Need to check imports

---

## 🔧 Optional Enhancements

| Optional Refactor | Status |
|-------------------|--------|
| Add `constants/taskConstants.ts` to `/shared/` for statuses, priorities | [ x ] |
| Create platform-aware wrappers in `/shared/components/` (e.g. `PlatformButton.tsx`) | [ ] |
| Add platform-specific entries: `main.native.tsx`, `main.web.tsx` | [ ] |

- taskConstants.ts is currently an empty file.

---

## 🧠 Design Notes

- Each feature module should be self-contained and export:
  - A `routes.ts` for dynamic navigation
  - A `services/` folder to support local/remote data access
- Keep shared logic DRY in `/shared/` for both mobile and web versions
- Master app can later consume any module via its `index.ts` export

---

## 🛠 Code Changes to Expect

- [ ] Update all `import` paths to reflect new folder structure  
  _e.g._ `import TaskCard from '../../shared/components/TaskCard'` → `import TaskCard from '../components/TaskCard'`
- [ ] Refactor `TaskDB.ts` logic into `TaskService.ts` and update usage  
- [ ] Replace direct SQLite calls with service method calls  
  _e.g._ `await db.getTasks()` → `await TaskService.getTasks()`
- [ ] Update navigation to use routes from `routes.ts`  
- [ ] Adjust test imports in `/__tests__/` if paths have changed  
- [ ] Ensure all moved files are correctly referenced in `index.ts` for module exports

---

Keep this file in `/00_docs/` and revisit it as you evolve the app. Let me know if you'd like a versioned copy or want to automate this checklist into a CLI or VS Code task.