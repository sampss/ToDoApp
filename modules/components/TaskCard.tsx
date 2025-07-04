import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { Task } from 'modules/types/Task';
import DateUtils from '@utils/dateUtils';
import TaskDetailsModal from '@components/TaskDetailsModal';

type Props = {
  task: Task;
  onToggleComplete: (taskId: number) => void;
  onDelete: (taskId: number) => void;
  onUpdateDetails?: (id: number, details: string) => void;
};

const TaskCard: React.FC<Props> = ({ task, onToggleComplete, onDelete, onUpdateDetails }) => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const isOverdue =
    task.completeBy &&
    new Date(task.completeBy) < new Date() &&
    !task.completed;

  const handleDetailsSave = (id: number, newDetails: string) => {
    if (onUpdateDetails) {
      onUpdateDetails(id, newDetails);
    }
  };

  return (
    <View style={styles.card}>
      <Pressable onPress={() => setDetailsOpen(true)}>
        <Text style={styles.detailsLink}>DETAILS</Text>
      </Pressable>

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

        <View style={styles.actionIcons}>
          <Pressable onPress={() => setDetailsOpen(true)} style={styles.iconButton}>
            <Text style={styles.editIcon}>✏️</Text>
          </Pressable>
          <Pressable onPress={() => onDelete(task.id)} style={styles.iconButton}>
            <Text style={styles.trashIcon}>🗑️</Text>
          </Pressable>
        </View>
      </View>

      <TaskDetailsModal
        task={task}
        visible={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        onSave={(newDetails) => handleDetailsSave(task.id, newDetails)}
      />
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
  detailsLink: {
    fontSize: 12,
    textAlign: 'center',
    textDecorationLine: 'underline',
    color: '#007bff',
    marginBottom: 6,
    fontWeight: '600',
    backgroundColor: '#fff', // just to test visibility,
  },
  actionIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    paddingHorizontal: 6,
  },
  editIcon: {
    fontSize: 18,
    marginRight: 4,
    color: '#007bff',
  },
  trashIcon: {
    fontSize: 18,
    color: '#b00020',
  },
});

export default TaskCard;