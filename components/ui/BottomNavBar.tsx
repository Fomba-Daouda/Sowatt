import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';

interface NavItem {
  label: string;
  icon: string;
  onPress: () => void;
}

interface BottomNavBarProps {
  activeTab: string;
  onTabPress: (tabName: string) => void;
}

export function BottomNavBar({ activeTab, onTabPress }: BottomNavBarProps) {
  const navItems: NavItem[] = [
    { 
      label: 'Accueil', 
      icon: '🏠', 
      onPress: () => onTabPress('Accueil') 
    },
    { 
      label: 'Compte', 
      icon: '👤', 
      onPress: () => onTabPress('Compte') 
    },
    { 
      label: 'Panier', 
      icon: '🛒', 
      onPress: () => onTabPress('Panier') 
    },
    { 
      label: 'Factures', 
      icon: '📄', 
      onPress: () => onTabPress('Factures') 
    },
    { 
      label: 'Achats', 
      icon: '🛍️', 
      onPress: () => onTabPress('Achats') 
    }
  ];
  
  return (
    <ThemedView style={styles.container}>
      {navItems.map((item) => (
        <TouchableOpacity 
          key={item.label}
          style={[
            styles.navItem,
            activeTab === item.label ? styles.activeNavItem : null
          ]}
          onPress={item.onPress}
        >
          <Text style={styles.navIcon}>{item.icon}</Text>
          <Text style={[
            styles.navLabel,
            activeTab === item.label ? styles.activeNavLabel : null
          ]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  activeNavItem: {
    borderBottomWidth: 0,
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 2,
  },
  navLabel: {
    fontSize: 12,
    color: '#666',
  },
  activeNavLabel: {
    color: '#0066CC',
    fontWeight: 'bold',
  }
}); 