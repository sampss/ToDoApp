import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Task } from '../types/Task';

type Props = {
  task: Task;
};

const formatDate = (dateStr?: string) => {
  if (!dateStr) return '–';
  const parsed = new Date(dateStr);
  return isNaN(parsed.getTime()) ? 'Invalid date' : parsed.toLocaleString();
};

const TaskCard: React.FC<Props> = ({ task }) => {
  const isOverdue =
    task.completeBy && new Date(task.completeBy) < new Date() && !task.completed;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        {task.completed ? '✅' : '⬜️'} {task.title}
      </Text>

      {task.completeBy && (
        <Text style={[styles.due, isOverdue && styles.overdue]}>
          📅 Complete by: {formatDate(task.completeBy)}
        </Text>
      )}

      <Text style={styles.timestamp}>
        🕒 Created: {formatDate(task.createdAt)}
      </Text>

    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fdf6e3',
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: '500',
  },
  due: {
    fontSize: 14,
    color: '#333',
  },
  overdue: {
    color: '#d22',
    fontWeight: '600',
  },
  timestamp: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
});

export default TaskCard;






/*
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

*/
