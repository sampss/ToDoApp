import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Platform,
  Text,
  Pressable,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface AddTaskProps {
  onAdd: (title: string, completeBy?: string) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [completeBy, setCompleteBy] = useState<Date | undefined>();
  const [showPicker, setShowPicker] = useState(false);

  const handleAdd = () => {
    if (title.trim() === '') return;
    onAdd(title.trim(), completeBy?.toISOString());
    setTitle('');
    setCompleteBy(undefined);
  };

  const handleDateChange = (_: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) setCompleteBy(selectedDate);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="What needs to be done?"
        value={title}
        onChangeText={setTitle}
      />

      <Pressable onPress={() => setShowPicker(true)} style={styles.dueDate}>
        <Text style={styles.dueDateText}>
          {completeBy ? `📅 Due: ${completeBy.toDateString()}` : '📅 Set Due Date'}
        </Text>
      </Pressable>

      {showPicker && (
        <DateTimePicker
          value={completeBy ?? new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
        />
      )}

      <Button title="Add Task" onPress={handleAdd} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  dueDate: {
    paddingVertical: 6,
  },
  dueDateText: {
    fontSize: 14,
    color: '#444',
  },
});

export default AddTask;