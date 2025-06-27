import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Task } from '../types/Task';

type Props = {
  task: Task;
};

const TaskCard: React.FC<Props> = ({ task }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        {task.completed ? '✅' : '⬜️'} {task.title}
      </Text>
      <Text style={styles.timestamp}>{task.createdAt}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fdf6e3',
    padding: 12,
    marginVertical: 4,
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  title: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: '#777',
  },
});

export default TaskCard;