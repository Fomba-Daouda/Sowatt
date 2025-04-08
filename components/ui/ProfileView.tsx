import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface ProfileViewProps {
  onBack: () => void;
}

export function ProfileView({ onBack }: ProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: 'utilisateur@example.com',
    phone: '+33 6 12 34 56 78',
    password: '********',
    address: '123 Rue de la Paix, 75001 Paris',
  });

  const handleSave = () => {
    setIsEditing(false);
    // Ici, vous pouvez ajouter la logique pour sauvegarder les modifications
  };

  return (
    <SafeAreaView style={styles.safeArea} >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#0066CC" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.editButton} 
          onPress={() => isEditing ? handleSave() : setIsEditing(true)}
        >
          <Text style={styles.editButtonText}>
            {isEditing ? 'Enregistrer' : 'Modifier'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <View style={styles.section}>
            <Text style={styles.label}>Email</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={userInfo.email}
                onChangeText={(text) => setUserInfo({...userInfo, email: text})}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            ) : (
              <Text style={styles.value}>{userInfo.email}</Text>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Téléphone</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={userInfo.phone}
                onChangeText={(text) => setUserInfo({...userInfo, phone: text})}
                keyboardType="phone-pad"
              />
            ) : (
              <Text style={styles.value}>{userInfo.phone}</Text>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Mot de passe</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={userInfo.password}
                onChangeText={(text) => setUserInfo({...userInfo, password: text})}
                secureTextEntry
              />
            ) : (
              <Text style={styles.value}>{userInfo.password}</Text>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Adresse</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={userInfo.address}
                onChangeText={(text) => setUserInfo({...userInfo, address: text})}
                multiline
              />
            ) : (
              <Text style={styles.value}>{userInfo.address}</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00A19B',
  },
  editButton: {
    padding: 8,
  },
  editButtonText: {
    color: '#00A19B',
    fontSize: 16,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  section: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  input: {
    fontSize: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#F9F9F9',
    color: '#333',
  },
}); 