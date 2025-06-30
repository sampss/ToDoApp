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

const TaskListScreen: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<'add' | 'search'>('add');
  const [completeBy, setCompleteBy] = useState<string | undefined>(undefined);
  const [filterDate, setFilterDate] = useState<string | undefined>(undefined);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [displayedTasks, setDisplayedTasks] = useState<Task[]>([]);

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

  const handleDeleteTask = (taskId: number) => {
    const taskToDelete = tasks.find(t => t.id === taskId);
    if (!taskToDelete) return;

    InteractionManager.runAfterInteractions(() => {
      Alert.alert(
        'Delete Task',
        `Are you sure you want to delete "${taskToDelete.title}"? This action cannot be undone.`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => {
              setTasks(prev => prev.filter(task => task.id !== taskId));
            },
          },
        ],
        { cancelable: true }
      );
    });
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
        <Pressable onPress={handleArchiveCompleted} style={styles.archiveButton}>
          <Text style={styles.archiveButtonText}>📦</Text>
        </Pressable>
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
          onDelete={handleDeleteTask} // 👈 Add this line
        />
      )}
    />
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
});

export default TaskListScreen;