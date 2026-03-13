import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, TextInput, ScrollView, SafeAreaView } from 'react-native';
import { ChevronLeft, Check } from 'lucide-react-native';
import api from '../services/api';
import { Colors, Spacing, BorderRadius } from '../theme/colors';

const EditNoteScreen = ({ navigation, route }: any) => {
    const { note } = route.params;
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);
    const [loading, setLoading] = useState(false);

    const handleUpdate = async () => {
        if (!title.trim() || !content.trim()) {
            Alert.alert('Error', 'Please enter both title and content');
            return;
        }

        setLoading(true);
        try {
            await api.put(`/notes/${note._id}`, { title, content });
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', 'Failed to update note');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
                        <ChevronLeft size={24} color={Colors.text} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Edit Note</Text>
                    <TouchableOpacity 
                        onPress={handleUpdate} 
                        disabled={loading || !title.trim() || !content.trim()}
                        style={[styles.saveButton, (!title.trim() || !content.trim()) && styles.saveButtonDisabled]}
                    >
                        {loading ? (
                            <ActivityIndicator color={Colors.black} size="small" />
                        ) : (
                            <Check size={24} color={Colors.black} />
                        )}
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    <TextInput
                        style={styles.titleInput}
                        placeholder="Title"
                        placeholderTextColor={Colors.textSecondary}
                        value={title}
                        onChangeText={setTitle}
                    />
                    <TextInput
                        style={styles.contentInput}
                        placeholder="Start typing your thoughts..."
                        placeholderTextColor={Colors.textSecondary}
                        value={content}
                        onChangeText={setContent}
                        multiline
                        textAlignVertical="top"
                    />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Spacing.xl,
        paddingTop: Spacing.xl,
        paddingBottom: Spacing.lg,
    },
    iconButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: Colors.text,
        letterSpacing: 0.5,
    },
    saveButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 8,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    saveButtonDisabled: {
        opacity: 0.3,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderColor: 'rgba(255, 255, 255, 0.05)',
        shadowOpacity: 0,
        elevation: 0,
    },
    scrollContent: {
        paddingHorizontal: Spacing.xl,
        paddingTop: Spacing.md,
        paddingBottom: Spacing.xxl,
    },
    titleInput: {
        fontSize: 34,
        fontWeight: '900',
        color: Colors.text,
        marginBottom: Spacing.md,
        paddingHorizontal: 0,
        letterSpacing: -1,
    },
    contentInput: {
        fontSize: 17,
        color: 'rgba(248, 250, 252, 0.85)',
        lineHeight: 28,
        minHeight: 500,
        paddingHorizontal: 0,
    },
});

export default EditNoteScreen;
