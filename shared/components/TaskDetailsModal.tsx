import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { Task } from '@typesafe/TaskTypes';
import DateUtils from '@utils/dateUtils';

type Props = {
  task: Task;
  visible: boolean;
  onClose: () => void;
  onSave: (updatedDetails: string) => void;
  initialEditMode?: boolean;
};

const TaskDetailsModal: React.FC<Props> = ({
  task,
  visible,
  onClose,
  onSave,
  initialEditMode,
}) => {
  const [isEditing, setIsEditing] = useState(initialEditMode || false);
  const [editedDetails, setEditedDetails] = useState(task.details || '');

  useEffect(() => {
    if (visible) {
      setIsEditing(initialEditMode || false);
      setEditedDetails(task.details || '');
    }
  }, [visible, initialEditMode, task.details]);

  const handleSave = () => {
    onSave(editedDetails.trim());
    setIsEditing(false);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <View style={styles.popup}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* Title + Edit toggle */}
            <View style={styles.header}>
              <Text style={styles.title}>{task.title}</Text>
              <Pressable onPress={() => setIsEditing(prev => !prev)}>
                <Text style={styles.icon}>✏️</Text>
              </Pressable>
            </View>

            {/* Created date */}
            <Text style={styles.timestamp}>
              Created: {DateUtils.formatDateForUI(task.createdAt)}
            </Text>

            {/* Due date */}
            {task.completeBy && (
              <Text style={styles.due}>
                📅 Complete by: {DateUtils.formatDateForUI(task.completeBy)}
              </Text>
            )}

            {/* Details */}
            {isEditing ? (
              <TextInput
                style={styles.textarea}
                multiline
                value={editedDetails}
                onChangeText={setEditedDetails}
                placeholder="Add details..."
              />
            ) : (
              <Text style={styles.details}>
                {task.details?.trim() || 'No details provided.'}
              </Text>
            )}
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            <Pressable style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Close</Text>
            </Pressable>
            {isEditing && (
              <Pressable style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
              </Pressable>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    width: '85%',
    maxHeight: '90%',
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 10,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    flex: 1,
    marginRight: 8,
  },
  icon: {
    fontSize: 18,
    color: '#007bff',
  },
  timestamp: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
    marginBottom: 6,
  },
  due: {
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
  },
  details: {
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
  },
  textarea: {
    fontSize: 14,
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 6,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 6,
  },
  button: {
    marginLeft: 12,
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: '#007bff',
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default TaskDetailsModal;