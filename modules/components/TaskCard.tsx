import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { Task } from 'modules/types/Task';
import DateUtils from '@utils/dateUtils';

type Props = {
  task: Task;
  onToggleComplete: (taskId: number) => void;
  onDelete: (taskId: number) => void;
};

const TaskCard: React.FC<Props> = ({ task, onToggleComplete, onDelete }) => {
  const isOverdue =
    task.completeBy &&
    new Date(task.completeBy) < new Date() &&
    !task.completed;

  return (
    <View style={styles.card}>
      <View style={styles.cardRow}>
        <TouchableOpacity onPress={() => onToggleComplete(task.id)} style={styles.cardContent}>
          <Text style={styles.title}>
            {task.completed ? '✅' : '⬜️'} {task.title}
          </Text>

          {task.completeBy && (
            <Text style={[styles.due, isOverdue && styles.overdue]}>
              📅 Complete by: {DateUtils.formatDateForUI(task.completeBy)}
            </Text>
          )}

          <Text style={styles.timestamp}>
            Created: {DateUtils.formatDateForUI(task.createdAt)}
          </Text>
        </TouchableOpacity>

        <Pressable onPress={() => onDelete(task.id)} style={styles.trashButton}>
          <Text style={styles.trashIcon}>🗑️</Text>
        </Pressable>
      </View>
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
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
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
  trashButton: {
    padding: 6,
    marginLeft: 12,
  },
  trashIcon: {
    fontSize: 18,
    color: '#b00020',
  },
});

export default TaskCard;