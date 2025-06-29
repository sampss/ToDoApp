import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { Task } from '../../shared/types/Task';
import TaskCard from '../../shared/components/TaskCard';
import AddTask from './AddTask';

const TaskListScreen: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Sketch UI for AddTask input',
      completed: false,
      createdAt: new Date().toISOString(),
    },
  ]);

  const handleAddTask = (title: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks([newTask, ...tasks]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📝 To-Do List</Text>
      <AddTask onAdd={handleAddTask} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <TaskCard task={item} />}
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
});

export default TaskListScreen;