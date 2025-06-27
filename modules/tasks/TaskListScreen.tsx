import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { Task } from '../../shared/types/Task';
import TaskCard from '../../shared/components/TaskCard';

const dummyTasks: Task[] = [
  {
    id: 1,
    title: 'Sketch UI for AddTask input',
    completed: false,
    createdAt: '2025-06-26 10:00',
  },
  {
    id: 2,
    title: 'Create initial SQLite schema',
    completed: true,
    createdAt: '2025-06-25 17:22',
  },
];

const TaskListScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>📝 To-Do List</Text>
      <FlatList
        data={dummyTasks}
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