
/**
 * 🧪 Dev stub: logs archived items instead of storing them
 */
export const mockArchiveWrite = async (archivedItems: any[]): Promise<void> => {
  console.log('[MockArchiveWrite] Archived items:', archivedItems);
};


type ArchiveContext = {
  appId: string;                   // optional, to distinguish source app
  archiveType?: string;           // e.g. "completed", "timeBased"
  timestamp?: number;             // auto-generated unless provided
};

export const archiveCompletedTasks = async (
  tasks: any[],
  dbWrite: (archived: any[]) => Promise<void>,
  context: ArchiveContext = { appId: 'ToDoApp' }
): Promise<void> => {
  const timestamp = Date.now();
  const archivedItems = tasks
    .filter(t => t.completed)
    .map(t => ({
      ...t,
      archivedAt: timestamp,
      archiveSource: context.appId || 'unknown'
    }));

  await dbWrite(archivedItems);
};

export const archiveOldTasks = async (
  tasks: any[],
  daysOld: number,
  dbWrite: (archived: any[]) => Promise<void>,
  context: ArchiveContext = { appId: 'ToDoApp' }
): Promise<void> => {
  const cutoff = Date.now() - daysOld * 24 * 60 * 60 * 1000;
  const archivedItems = tasks
    .filter(t => new Date(t.dateCreated).getTime() < cutoff)
    .map(t => ({ ...t, archivedAt: Date.now(), archiveSource: context.appId }));

  await dbWrite(archivedItems);
};













/*

✅ For Immediate Testing in ToDoApp (Without DB)
You could define a simple mock function like

const mockArchiveWrite = async (archived: any[]) => {
  console.log('Archived items:', archived);
};


--------

Then call the service:

await archiveCompletedTasks(tasks, mockArchiveWrite);

------

another dev option log archived items

await archiveCompletedTasks(tasks, mockArchiveWrite);


*/