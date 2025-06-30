import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Platform, Text, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

type AddTaskProps = {
  onAdd: (title: string, completeBy?: string) => void;
};

const AddTask: React.FC<AddTaskProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [completeBy, setCompleteBy] = useState<Date | null>(null);

  const handleAdd = () => {
    if (!title.trim()) return;
    onAdd(title.trim(), completeBy?.toISOString());
    setTitle('');
    setCompleteBy(null);
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Add a task..."
        style={styles.input}
      />

      <Pressable onPress={() => setShowPicker(true)} style={styles.dueButton}>
        <Text style={styles.dueText}>
          {completeBy
            ? `📅 Due: ${completeBy.toDateString()}`
            : '➕ Set Due Date'}
        </Text>
      </Pressable>

      {showPicker && (
        <DateTimePicker
          value={completeBy ?? new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (event.type !== 'dismissed' && selectedDate) {
              setCompleteBy(selectedDate);
            }
          }}
        />
      )}

      <Button title="Add Task" onPress={handleAdd} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  dueButton: {
    marginBottom: 8,
    paddingVertical: 6,
    alignItems: 'flex-start',
  },
  dueText: {
    fontSize: 14,
    color: '#555',
  },
});

export default AddTask;