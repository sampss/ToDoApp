import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { Task } from '@typesafe/Task';
import DateUtils from '@utils/dateUtils';
import TaskDetailsModal from '@components/TaskDetailsModal';

type Props = {
  task: Task;
  onToggleComplete: (taskId: number) => void;
  onDelete: (taskId: number) => void;
  onUpdateDetails?: (id: number, details: string, completeBy?: string) => void;
};

const TaskCard: React.FC<Props> = ({ task, onToggleComplete, onDelete, onUpdateDetails }) => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const isOverdue =
    task.completeBy &&
    new Date(task.completeBy) < new Date() &&
    !task.completed;

  const handleDetailsSave = (id: number, newDetails: string, newDate?: string) => {
    if (onUpdateDetails) {
      onUpdateDetails(id, newDetails, newDate);
    }
  };

  return (
    <View style={styles.card}>
      {/* Top Row: DETAILS Center + Pencil Right */}
      <View style={styles.topRow}>
        <View style={styles.detailsWrapper}>
          <Text
            style={styles.detailsLink}
            onPress={() => {
              setDetailsOpen(true);
              setEditMode(false);
            }}
          >
            DETAILS
          </Text>
        </View>
        <View style={styles.pencilWrapper}>
          <Pressable
            onPress={() => {
              setDetailsOpen(true);
              setEditMode(true);
            }}
          >
            <Text style={styles.editIcon}>✏️</Text>
          </Pressable>
        </View>
      </View>

      {/* Main Row: Task Info + Trash */}
      <View style={styles.cardRow}>
        {/* Left Side: Task Info */}
        <View style={styles.cardContent}>
          <TouchableOpacity onPress={() => onToggleComplete(task.id)}>
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
        </View>

        {/* Right Side: Trash anchored to bottom */}
        <View style={styles.rightBlock}>
          <View style={{ flex: 1 }} />
          <Pressable onPress={() => onDelete(task.id)} style={styles.iconButton}>
            <Text style={styles.trashIcon}>🗑️</Text>
          </Pressable>
        </View>
      </View>

      <TaskDetailsModal
        task={task}
        visible={detailsOpen}
        initialEditMode={editMode}
        onClose={() => {
          setDetailsOpen(false);
          setEditMode(false);
        }}
        onSave={(newDetails, newDate) =>
          handleDetailsSave(task.id, newDetails, newDate)
        }
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
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  detailsWrapper: {
    flex: 1.5,
    alignItems: 'flex-end',
  },
  pencilWrapper: {
    flex: 1,
    alignItems: 'flex-end',
  },
  detailsLink: {
    fontSize: 14,
    textDecorationLine: 'underline',
    color: '#007bff',
    fontWeight: '600',
  },
  cardRow: {
    flexDirection: 'row',
  },
  cardContent: {
    flex: 2,
  },
  rightBlock: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingVertical: 4,
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
  iconButton: {
    padding: 4,
  },
  editIcon: {
    fontSize: 18,
    color: '#007bff',
  },
  trashIcon: {
    fontSize: 18,
    color: '#b00020',
  },
});

export default TaskCard;