import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { Colors, Spacing, BorderRadius } from '../theme/colors';

interface InputFieldProps extends TextInputProps {
    label: string;
    error?: string;
    icon?: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({ 
    label, 
    error, 
    icon,
    style,
    ...props 
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={[
                styles.inputWrapper,
                error ? styles.inputError : null,
            ]}>
                {icon && <View style={styles.iconContainer}>{icon}</View>}
                <TextInput
                    style={[styles.input, style]}
                    placeholderTextColor={Colors.textSecondary}
                    {...props}
                />
            </View>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: Spacing.xl,
    },
    label: {
        fontSize: 13,
        fontWeight: '700',
        color: Colors.textSecondary,
        marginBottom: Spacing.sm,
        marginLeft: 2,
        textTransform: 'uppercase',
        letterSpacing: 1.2,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: BorderRadius.md,
        borderWidth: 1.5,
        borderColor: 'rgba(255, 255, 255, 0.08)',
        height: 60,
        paddingHorizontal: Spacing.md,
    },
    iconContainer: {
        marginRight: Spacing.sm,
        opacity: 0.7,
    },
    input: {
        flex: 1,
        color: Colors.text,
        fontSize: 15,
        fontWeight: '500',
        padding: 0,
    },
    inputError: {
        borderColor: Colors.error,
        backgroundColor: 'rgba(239, 68, 68, 0.05)',
    },
    errorText: {
        color: Colors.error,
        fontSize: 12,
        fontWeight: '600',
        marginTop: 6,
        marginLeft: 4,
    },
});

export default InputField;
