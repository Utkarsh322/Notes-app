import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert, RefreshControl, SafeAreaView, StatusBar } from 'react-native';
import { Plus, LogOut, Search } from 'lucide-react-native';
import NoteCard from '../components/NoteCard';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Colors, Spacing, BorderRadius } from '../theme/colors';

const HomeScreen = ({ navigation }: any) => {
    const [notes, setNotes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const { logout, user } = useAuth();

    const fetchNotes = async () => {
        try {
            const response = await api.get('/notes');
            setNotes(response.data);
        } catch (error) {
            console.error('Error fetching notes', error);
            Alert.alert('Error', 'Failed to fetch notes');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchNotes();
        });
        return unsubscribe;
    }, [navigation]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchNotes();
    }, []);

    const handleDelete = (id: string) => {
        Alert.alert(
            'Delete Note',
            'Are you sure you want to delete this note?',
            [
                { text: 'Cancel', style: 'cancel' },
                { 
                    text: 'Delete', 
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await api.delete(`/notes/${id}`);
                            setNotes(notes.filter(note => note._id !== id));
                        } catch (error) {
                            Alert.alert('Error', 'Failed to delete note');
                        }
                    }
                },
            ]
        );
    };

    const renderEmptyState = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No notes yet</Text>
            <Text style={styles.emptySubtitle}>Tap the + button to create your first note!</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" />
            <View style={styles.container}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Notes</Text>
                        <Text style={styles.userName}>{user?.name?.split(' ')[0]}'s Workspace</Text>
                    </View>
                    <View style={styles.headerActions}>
                        <TouchableOpacity style={styles.iconButton}>
                            <Search size={22} color={Colors.textSecondary} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={logout} style={[styles.iconButton, styles.logoutButton]}>
                            <LogOut size={20} color={Colors.error} />
                        </TouchableOpacity>
                    </View>
                </View>

                {loading ? (
                    <View style={styles.center}>
                        <ActivityIndicator size="large" color={Colors.primary} />
                    </View>
                ) : (
                    <FlatList
                        data={notes}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <NoteCard
                                title={item.title}
                                content={item.content}
                                onEdit={() => navigation.navigate('EditNote', { note: item })}
                                onDelete={() => handleDelete(item._id)}
                            />
                        )}
                        contentContainerStyle={styles.listContent}
                        ListEmptyComponent={renderEmptyState}
                        refreshControl={
                            <RefreshControl 
                                refreshing={refreshing} 
                                onRefresh={onRefresh} 
                                tintColor={Colors.primary}
                                colors={[Colors.primary]} 
                            />
                        }
                    />
                )}

                <TouchableOpacity 
                    style={styles.fab}
                    onPress={() => navigation.navigate('CreateNote')}
                >
                    <Plus size={32} color={Colors.black} />
                </TouchableOpacity>
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
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Spacing.xl,
        paddingTop: Spacing.xl,
        paddingBottom: Spacing.lg,
    },
    greeting: {
        fontSize: 34,
        fontWeight: '900',
        color: Colors.text,
        letterSpacing: -1,
    },
    userName: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginTop: 2,
        fontWeight: '500',
    },
    headerActions: {
        flexDirection: 'row',
    },
    iconButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: Spacing.sm,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    logoutButton: {
        borderColor: 'rgba(239, 68, 68, 0.2)',
    },
    listContent: {
        padding: Spacing.xl,
        paddingBottom: 110,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 120,
        paddingHorizontal: Spacing.xxl,
    },
    emptyTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: Colors.text,
        marginBottom: 10,
        textAlign: 'center',
    },
    emptySubtitle: {
        fontSize: 15,
        color: Colors.textSecondary,
        textAlign: 'center',
        lineHeight: 22,
    },
    fab: {
        position: 'absolute',
        right: Spacing.xl,
        bottom: Spacing.xl,
        backgroundColor: Colors.primary,
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
        elevation: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
});

export default HomeScreen;
