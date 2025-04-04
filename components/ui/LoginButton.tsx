import { StyleSheet, TouchableOpacity, Text, View, Modal } from 'react-native';
import { useState } from 'react';

interface LoginButtonProps {
  onPress: () => void;
}

export function LoginButton({ onPress }: LoginButtonProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const handlePress = () => {
    setIsLoggedIn(!isLoggedIn);
    onPress();
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={toggleMenu}>
        <Text style={styles.icon}>{isLoggedIn ? '🔓' : '🔒'}</Text>
        <Text style={styles.text}>{isLoggedIn ? 'Déconnexion' : 'Connexion'}</Text>
      </TouchableOpacity>

      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleMenu}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          onPress={toggleMenu}
          activeOpacity={1}
        >
          <View style={styles.menuContainer}>
            {['Comptes', 'Commandes', 'Centre de messagerie', 'Abonnement', 'Service client'].map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => {
                  toggleMenu();
                  alert(`Navigating to ${item}`);
                }}
              >
                <Text style={styles.menuItemText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  icon: {
    fontSize: 18,
    marginRight: 4,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  menuContainer: {
    marginTop: 60,
    marginRight: 20,
    borderRadius: 8,
    paddingVertical: 8,
    minWidth: 180,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuItemText: {
    fontSize: 16,
  }
}); 