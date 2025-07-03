import React, { useState, useEffect, useRef, } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
  Button,
  Platform,
  Alert, 
  InteractionManager,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Task } from '@typesafe/Task';
import TaskCard from '@components/TaskCard';
import ArchiveButton from '@shared/components/ArchiveButton';
import { archiveCompletedTasks } from '@services/ArchiveService';
import { mockArchiveWrite } from '@services/ArchiveService'; // Or use real DB write logic

const TaskListScreen: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<'add' | 'search'>('add');
  const [completeBy, setCompleteBy] = useState<string | undefined>(undefined);
  const [filterDate, setFilterDate] = useState<string | undefined>(undefined);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [displayedTasks, setDisplayedTasks] = useState<Task[]>([]);

  const handleArchiveSelected = async () => {
    const selected = tasks.filter(t => t.completed);
    if (selected.length === 0) {
      console.log('⚠️ No tasks selected to archive.');
      return;
    }

    try {
      await archiveCompletedTasks(selected, mockArchiveWrite, { appId: 'ToDoApp' });

      const remaining = tasks.filter(t => !t.completed);
      setTasks(remaining); // ✅ Update displayed list
      console.log('✅ Archived and updated task list.');
    } catch (error) {
      console.error('🛑 Archive failed:', error);
    }
  };


  const applyFilters = () => {
    const normalized = query.toLowerCase();
    if (mode === 'search') {
      setDisplayedTasks(
        tasks.filter(task => {
          const matchesQuery = task.title.toLowerCase().includes(normalized);
          const matchesDate =
            !filterDate ||
            (task.completeBy &&
              new Date(task.completeBy).toDateString() === new Date(filterDate).toDateString());
          return matchesQuery && matchesDate;
        })
      );
    } else {
      setDisplayedTasks(tasks);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [query, tasks, mode]);

  useEffect(() => {
    if (mode === 'search') {
      applyFilters();
    }
  }, [filterDate]);

  const handleAddTask = (title: string, date?: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
      completeBy: date,
    };
    setTasks([newTask, ...tasks]);
    setQuery('');
    setCompleteBy(undefined);
  };

  const handleToggleComplete = (taskId: number) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleArchiveCompleted = () => {
    setTasks(prev => prev.filter(task => !task.completed));
  };

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

  const confirmDelete = (taskId: number) => {
    setPendingDeleteId(taskId);
    setDeleteModalVisible(true);
  };

  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>📝 To-Do List</Text>
        <ArchiveButton 
          onPress={handleArchiveSelected}
          centerText='📦'
          btnColor='green' />
      </View>

      <View style={styles.inputRow}>
        <Pressable
          onPress={() => setMode('add')}
          style={[styles.iconButton, mode === 'add' && styles.activeIcon]}
        >
          <Text>✏️</Text>
        </Pressable>

        <TextInput
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          placeholder={mode === 'add' ? 'Add a task...' : 'Search tasks...'}
        />

        <Pressable
          onPress={() => setMode('search')}
          style={[styles.iconButton, mode === 'search' && styles.activeIcon]}
        >
          <Text>🔍</Text>
        </Pressable>
      </View>

      <View style={styles.addControls}>
        <Pressable
          onPress={() => setShowDatePicker(true)}
          style={styles.dateButton}
        >
          <Text style={styles.dateButtonText}>
            {mode === 'add'
              ? completeBy
                ? `📅 ${new Date(completeBy).toDateString()}`
                : '📅 Due Date'
              : filterDate
                ? `🔎 ${new Date(filterDate).toDateString()}`
                : '🔎 Filter by Date'}
          </Text>
        </Pressable>

        {mode === 'search' && filterDate && (
          <Pressable
            onPress={() => setFilterDate(undefined)}
            style={styles.clearFilter}
          >
            <Text style={styles.clearFilterText}>✖️ Clear</Text>
          </Pressable>
        )}

        {mode === 'add' && (
          <Button
            title="Add Task"
            onPress={() => {
              if (query.trim()) {
                handleAddTask(query.trim(), completeBy);
              }
            }}
          />
        )}
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={
            mode === 'add'
              ? completeBy
                ? new Date(completeBy)
                : new Date()
              : filterDate
                ? new Date(filterDate)
                : new Date()
          }
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (event.type !== 'dismissed' && selectedDate) {
              const iso = selectedDate.toISOString();
              if (mode === 'add') {
                setCompleteBy(iso);
              } else {
                setFilterDate(iso);
              }
            }
          }}
        />
      )}

    <FlatList
      data={displayedTasks}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <TaskCard
          task={item}
          onToggleComplete={handleToggleComplete}
          onDelete={confirmDelete}
        />
      )}
    />
    {deleteModalVisible && (
      <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>
          <Text style={styles.modalTitle}>Delete Task?</Text>
          <Text style={styles.modalMessage}>This will permanently delete the task.</Text>

          <View style={styles.modalButtons}>
            <Pressable
              onPress={() => {
                setDeleteModalVisible(false);
                setPendingDeleteId(null);
              }}
              style={[styles.modalButton, styles.cancelButton]}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>

            <Pressable
              onPress={() => {
                if (pendingDeleteId !== null) {
                  setTasks(prev => prev.filter(task => task.id !== pendingDeleteId));
                }
                setDeleteModalVisible(false);
                setPendingDeleteId(null);
              }}
              style={[styles.modalButton, styles.deleteButton]}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </Pressable>
          </View>
        </View>
      </View>
    )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf6e3',
    paddingHorizontal: 16,
    paddingTop: 48,
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: '600',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  archiveButton: {
    backgroundColor: '#6adf78',
    borderColor: '#000',
    borderWidth: 1.5,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  archiveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconButton: {
    padding: 8,
    opacity: 0.4,
  },
  activeIcon: {
    opacity: 1,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginHorizontal: 4,
    backgroundColor: '#fff',
  },
  addControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#aaa',
    flexShrink: 1,
  },
  dateButtonText: {
    fontSize: 14,
    color: '#333',
  },
  addButtonWrapper: {
    flexShrink: 0,
    marginLeft: 12,
  },
  clearFilter: {
    marginLeft: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#eee',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#aaa',
  },
  clearFilterText: {
    fontSize: 12,
    color: '#444',
    fontWeight: '500',
  },
  modalOverlay: {
  position: 'absolute',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.4)',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
},

modalBox: {
  width: '80%',
  backgroundColor: '#fff',
  borderRadius: 8,
  padding: 20,
  elevation: 4,
},

modalTitle: {
  fontSize: 18,
  fontWeight: '600',
  marginBottom: 8,
},

modalMessage: {
  fontSize: 14,
  color: '#555',
  marginBottom: 16,
},

modalButtons: {
  flexDirection: 'row',
  justifyContent: 'flex-end',
},

modalButton: {
  paddingVertical: 8,
  paddingHorizontal: 16,
  marginLeft: 8,
  borderRadius: 4,
},

cancelButton: {
  backgroundColor: '#eee',
},

deleteButton: {
  backgroundColor: '#d22',
},

buttonText: {
  color: '#fff',
  fontWeight: '600',
},
});

export default TaskListScreen;