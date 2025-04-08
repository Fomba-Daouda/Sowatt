import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { useState, useEffect } from 'react';

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

interface User {
  id: string;
  name: string;
  avatar?: string;
}

export function MessageView() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: 'user1',
      receiverId: 'user2',
      content: 'Bonjour, comment puis-je vous aider ?',
      timestamp: '2024-03-20T10:30:00',
      isRead: true
    },
    {
      id: '2',
      senderId: 'user2',
      receiverId: 'user1',
      content: 'J\'ai une question concernant ma facture',
      timestamp: '2024-03-20T10:32:00',
      isRead: true
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users] = useState<User[]>([
    { id: 'user1', name: 'Support SoWatt' },
    { id: 'user2', name: 'Client Premium' }
  ]);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedUser) {
      const message: Message = {
        id: Date.now().toString(),
        senderId: 'user1', // ID de l'utilisateur actuel
        receiverId: selectedUser.id,
        content: newMessage,
        timestamp: new Date().toISOString(),
        isRead: false
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isSent = item.senderId === 'user1';
    return (
      <View style={[
        styles.messageContainer,
        isSent ? styles.sentMessage : styles.receivedMessage
      ]}>
        <Text style={styles.messageContent}>{item.content}</Text>
        <Text style={styles.timestamp}>
          {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.userList}>
        {users.map(user => (
          <TouchableOpacity
            key={user.id}
            style={[
              styles.userItem,
              selectedUser?.id === user.id && styles.selectedUser
            ]}
            onPress={() => setSelectedUser(user)}
          >
            <Text style={styles.userName}>{user.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.chatContainer}>
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messagesList}
        />
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Tapez votre message..."
            multiline
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendMessage}
          >
            <Text style={styles.sendButtonText}>Envoyer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  userList: {
    width: '100%',
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  userItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  selectedUser: {
    backgroundColor: '#e3f2fd',
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
  },
  chatContainer: {
    flex: 1,
  },
  messagesList: {
    padding: 10,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA',
  },
  messageContent: {
    fontSize: 16,
    color: '#000',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
}); 