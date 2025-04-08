import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

interface NavItem {
  label: string;
  icon: string;
  onPress: () => void;
}

interface BottomNavBarProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
  cartItemsCount?: number;
}

export function BottomNavBar({ activeTab, onTabPress, cartItemsCount = 0 }: BottomNavBarProps) {
  const [accountMenuVisible, setAccountMenuVisible] = useState(false);

  const navItems: NavItem[] = [
    { 
      label: 'Accueil', 
      icon: 'home-outline', 
      onPress: () => onTabPress('Accueil') 
    },
    { 
      label: 'Panier', 
      icon: 'cart-outline', 
      onPress: () => onTabPress('Panier') 
    },
    { 
      label: 'Achats', 
      icon: 'bag-handle-outline', 
      onPress: () => onTabPress('Achats') 
    },
    { 
      label: 'Factures', 
      icon: 'document-text-outline', 
      onPress: () => onTabPress('Factures') 
    },
    { 
      label: 'Compte', 
      icon: 'person-outline', 
      onPress: () => {
        setAccountMenuVisible(true);
        onTabPress('Compte');
      }
    },
  ];

  return (
    <View style={styles.container}>
      {navItems.map((item) => (
        <TouchableOpacity
          key={item.label}
          style={[
            styles.navItem,
            activeTab === item.label && styles.activeNavItem
          ]}
          onPress={item.onPress}
        >
          <Ionicons 
            name={item.icon as any} 
            size={24} 
            color={activeTab === item.label ? 'white' : '#00A19B'} 
          />
          <Text style={[
            styles.navText,
            activeTab === item.label && styles.activeNavText
          ]}>
            {item.label}
          </Text>
          {item.label === 'Panier' && cartItemsCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartItemsCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#00A19B',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navItem: {
    alignItems: 'center',
    padding: 8,
  },
  activeNavItem: {
    backgroundColor: '#008B8B',
    borderRadius: 8,
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: 'white',
  },
  activeNavText: {
    fontWeight: 'bold',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FF5252',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
}); 