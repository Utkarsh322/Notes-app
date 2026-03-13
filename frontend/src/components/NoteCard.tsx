import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Edit2, Trash2 } from 'lucide-react-native';
import { Colors, Spacing, BorderRadius } from '../theme/colors';

interface NoteCardProps {
    title: string;
    content: string;
    onEdit: () => void;
    onDelete: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ title, content, onEdit, onDelete }) => {

    const contentPreview = content.length > 100 ? content.substring(0, 100) + '...' : content;

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.title} numberOfLines={1}>{title}</Text>
                <View style={styles.actions}>
                    <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
                        <Edit2 size={16} color={Colors.accent} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onDelete} style={styles.actionButton}>
                        <Trash2 size={16} color={Colors.error} />
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.content} numberOfLines={3}>{contentPreview}</Text>
            <View style={styles.footer}>
                <View style={styles.tag}>
                    <Text style={styles.tagText}>General</Text>
                </View>
                <Text style={styles.date}>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
        marginBottom: Spacing.md,
        borderWidth: 1,
        borderColor: 'rgba(139, 92, 246, 0.1)', // Subtle primary color border
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: Spacing.sm,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.text,
        flex: 1,
        marginRight: Spacing.sm,
        letterSpacing: 0.5,
    },
    actions: {
        flexDirection: 'row',
    },
    actionButton: {
        marginLeft: Spacing.xs,
        padding: 6,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: BorderRadius.md,
    },
    content: {
        fontSize: 14,
        color: Colors.textSecondary,
        lineHeight: 22,
        marginBottom: Spacing.md,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: Spacing.xs,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.05)',
        paddingTop: Spacing.sm,
    },
    tag: {
        backgroundColor: 'rgba(139, 92, 246, 0.15)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: BorderRadius.sm,
    },
    tagText: {
        color: Colors.accent,
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    date: {
        fontSize: 12,
        color: Colors.textSecondary,
        fontStyle: 'italic',
    },
});

export default NoteCard;
