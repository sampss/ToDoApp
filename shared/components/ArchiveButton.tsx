import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

type ArchiveButtonProps = {
  onPress: () => void;
  topText?: string;
  bottomText?: string;
  leftText?: string;
  rightText?: string;
  centerText?: string;
  disabled?: boolean;
};

const ArchiveButton: React.FC<ArchiveButtonProps> = ({
  onPress,
  topText,
  bottomText,
  centerText,
  leftText,
  rightText,
  disabled = false,
}) => {
  return (
    <View style={styles.wrapper}>
    {topText && <Text style={styles.top}>{topText}</Text>}

    <Pressable
        onPress={onPress}
        style={({ pressed }) => [
        styles.boxButton,
        disabled && styles.disabled,
        pressed && styles.pressed,
        ]}
        disabled={disabled}
    >
        <Text style={styles.buttonText}>
            {leftText ? `${leftText + ' '} ` : ''}
            {centerText || 'Archive'}
            {rightText ? ` ${' ' + rightText}` : ''}
        </Text>

    </Pressable>

    {bottomText && <Text style={styles.bottom}>{bottomText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        marginVertical: 10,
    },
    top: {
        marginBottom: 5,
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
    },
    bottom: {
        marginTop: 5,
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#6adf78',
        borderColor: '#000',
        borderWidth: 1.5,
        borderRadius: 6,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
    icon: {
        fontSize: 18,
        marginHorizontal: 15,
    },
    pressed: {
        opacity: 0.75,
    },
    disabled: {
        backgroundColor: '#ccc',
        borderColor: '#888',
    },
    boxButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 6,
    backgroundColor: '#6adf78',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
        },
        row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sideIcon: {
    fontSize: 18,
    marginHorizontal: 15,
    },
    label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    },
    label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    },
});

export default ArchiveButton;