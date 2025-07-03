# ✅ ToDoApp Architecture Checklist

This document outlines the ideal file structure and design principles for the ToDoApp module. It ensures consistency, scalability, and compatibility with future goals like web support, offline-first functionality, and master app integration.

---

## 📁 Root-Level Essentials

- [ ] `App.tsx` – App entry point
- [ ] `index.js` – Platform bootstrap
- [ ] `app.json`, `package.json`, `tsconfig.json`, `babel.config.js`, `metro.config.js`
- [ ] `.eslintrc.js`, `.prettierrc.js`, `.gitignore`, `.watchmanconfig`
- [ ] `README.md` – Project overview
- [ ] `00_docs/` – Architecture and module documentation

---

## 📦 `/modules/tasks` – Feature Module

- [ ] `components/` – TaskCard, TaskInput, etc.
- [ ] `screens/` – TaskListScreen, AddEditTaskScreen
- [ ] `services/` – `TaskService.ts` (local/remote logic)
- [ ] `hooks/` – `useTasks.ts`, etc.
- [ ] `types/` – `Task.ts`, module-specific interfaces
- [ ] `routes.ts` – Route definitions for dynamic navigation
- [ ] `index.ts` – Barrel export for module integration

---

## 🌍 `/shared` – Cross-Platform Logic

- [ ] `components/` – Modal, ErrorToast, etc.
- [ ] `utils/` – `dateUtils.ts`, formatting helpers
- [ ] `types/` – Shared interfaces (e.g., `User.ts`)
- [ ] `constants/` – Enums, status maps, literals
- [ ] `services/` – Shared API clients or sync logic (optional)

---

## 💾 `/database`

- [ ] `TaskDB.ts` – SQLite schema or local DB logic
- [ ] Modular DB setup for other features
- [ ] Interface abstraction between DB and services

---

## 🧪 `/__tests__`

- [ ] Unit tests for components, screens, and services
- [ ] Integration tests for task workflows

---

## 🧠 Architecture Goals

| Goal | Supported By |
|------|--------------|
| Mobile-first | React Native + modular screens |
| Web-ready | Shared logic + platform-aware entry points |
| Offline support | Local DB + service abstraction |
| Sync-capable | Replaceable service interfaces |
| Modular & standalone | Self-contained feature folders |
| Master app ready | `routes.ts` + `index.ts` exports |
| Shared code reuse | `/shared/` directory structure |

---

## 🔁 Usage

Use this checklist to:
- Audit your current module structure
- Guide new feature module creation
- Ensure long-term maintainability and integration readiness
