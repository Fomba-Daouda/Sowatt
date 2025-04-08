import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface LoginButtonProps {
  isLoggedIn: boolean;
  onPress: () => void;
}

export function LoginButton({ isLoggedIn, onPress }: LoginButtonProps) {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
    >
      <Ionicons 
        name={isLoggedIn ? 'log-out-outline' : 'log-in-outline'} 
        size={24} 
        color="white"
      />
      <Text style={styles.text}>{isLoggedIn ? 'Déconnexion' : 'Connexion'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  text: {
    marginLeft: 8,
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
  },
}); 