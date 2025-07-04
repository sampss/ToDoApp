import React, { useState } from 'react';
import { Modal, View, Text, Pressable, TextInput, StyleSheet } from 'react-native';
import { Task } from '@typesafe/TaskTypes';

type Props = {
  task: Task;
  visible: boolean;
  onClose: () => void;
  onSave: (updatedDetails: string) => void;
};

const TaskDetailsModal: React.FC<Props> = ({ task, visible, onClose, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState(task.details || '');

  const handleSave = () => {
    setIsEditing(false);
    onSave(editedDetails.trim());
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <View style={styles.header}>
            <Text style={styles.title}>{task.title}</Text>
            <Pressable onPress={() => setIsEditing(prev => !prev)}>
              <Text style={styles.icon}>✏️</Text>
            </Pressable>
          </View>

          {isEditing ? (
            <TextInput
              style={styles.textarea}
              multiline
              value={editedDetails}
              onChangeText={setEditedDetails}
              placeholder="Enter task details..."
            />
          ) : (
            <Text style={styles.details}>{task.details || 'No details provided.'}</Text>
          )}

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
      </View>
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
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    flexShrink: 1,
  },
  icon: {
    fontSize: 18,
  },
  details: {
    marginVertical: 12,
    fontSize: 14,
    color: '#333',
  },
  textarea: {
    marginVertical: 12,
    fontSize: 14,
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 6,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
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