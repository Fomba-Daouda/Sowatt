import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Modal } from 'react-native';
import { MeterView } from './MeterView';
import { ProfileView } from './ProfileView';

interface AccountDropdownProps {
  visible?: boolean;
  onClose?: () => void;
}

export function AccountDropdown({ visible = false, onClose }: AccountDropdownProps) {
  const [showMeters, setShowMeters] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  if (!visible) return null;

  const menuItems = [
    { id: 'profil', title: 'Mon Profil' },
    { id: 'Compteurs', title: 'Mes Compteurs' },
    { id: 'messages', title: 'Messages' },
    { id: 'subscription', title: 'Abonnement' },
    { id: 'support', title: 'Support Client' },
    { id: 'settings', title: 'Paramètres' },
  ];

  const handleMenuItemPress = (itemId: string) => {
    if (itemId === 'Compteurs') {
      setShowMeters(true);
    } else if (itemId === 'profil') {
      setShowProfile(true);
    } else {
      onClose?.();
    }
  };

  return (
    <>
      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={() => handleMenuItemPress(item.id)}
          >
            <Text style={styles.menuItemText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Modal
        visible={showMeters}
        animationType="slide"
        onRequestClose={() => {
          setShowMeters(false);
        }}
      >
        <View style={styles.modalContainer}>
          <MeterView 
            onClose={() => {
              setShowMeters(false);
              onClose?.();
            }}
            onBack={() => {
              setShowMeters(false);
            }}
          />
        </View>
      </Modal>

      <Modal
        visible={showProfile}
        animationType="slide"
        onRequestClose={() => {
          setShowProfile(false);
        }}
      >
        <View style={styles.modalContainer}>
          <ProfileView 
            onBack={() => {
              setShowProfile(false);
            }}
          />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 2,
    marginHorizontal: 4,
    marginTop: 1,
    position: 'absolute',
    top: 0,
    zIndex: 1000,
  },
  menuItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  closeButton: {
    padding: 16,
    alignItems: 'flex-end',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#0066CC',
    fontWeight: '500',
  }
}); 