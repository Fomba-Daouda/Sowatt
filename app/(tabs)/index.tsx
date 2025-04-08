import { StyleSheet, View, SafeAreaView, TouchableOpacity, Text, Alert } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { SowattList } from '@/components/ui/SowattList';
import { CartList } from '@/components/ui/CartList';
import { BottomNavBar } from '@/components/ui/BottomNavBar';
import { LoginButton } from '@/components/ui/LoginButton';
import { useState } from 'react';
import { Sowatt } from '@/components/ui/SowattCard';
import { AccountDropdown } from '@/components/ui/AccountDropdown';
import { router } from 'expo-router';
import { LoginView } from '@/components/auth/LoginView';
import { RegisterView } from '@/components/auth/RegisterView';
import { BillView } from '@/components/ui/BillView';
import { MeterView } from '@/components/ui/MeterView';

interface CartItem {
  sowatt: Sowatt;
  quantity: number;
}

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState('Accueil');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showMeters, setShowMeters] = useState(false);

  const sowatts = [
    {
      type: "Électricité solaire",
      description: "Énergie verte produite par des panneaux solaires",
      price: 0.15,
      location: "Paris, France",
      sellerName: "Jean Dupont",
      isAvailable: true,
      imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=500&auto=format&fit=crop&q=60"
    },
    {
      type: "Électricité éolienne",
      description: "Énergie produite par des éoliennes domestiques",
      price: 0.18,
      location: "Lyon, France",
      sellerName: "Marie Martin",
      isAvailable: true,
      imageUrl: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=500&auto=format&fit=crop&q=60"
    },
    {
      type: "Électricité hydraulique",
      description: "Énergie produite par une micro-centrale hydraulique",
      price: 0.12,
      location: "Bordeaux, France",
      sellerName: "Pierre Durand",
      isAvailable: false,
      imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=500&auto=format&fit=crop&q=60"
    }
  ];

  const handleAddToCart = (sowatt: Sowatt, quantity: number) => {
    setCartItems(prev => [...prev, { sowatt, quantity }]);
  };

  const handleRemoveItem = (sowatt: Sowatt) => {
    setCartItems(prev => prev.filter(item => item.sowatt !== sowatt));
  };

  const handleUpdateQuantity = (sowatt: Sowatt, quantity: number) => {
    setCartItems(prev => prev.map(item => 
      item.sowatt === sowatt ? { ...item, quantity } : item
    ));
  };

  const handleCheckout = () => {
    // Logique pour passer la commande
    console.log('Commande passée:', cartItems);
  };


  const renderContent = () => {
    switch (activeTab) {
      case 'Accueil':
        return (
          <SowattList 
            sowatts={sowatts} 
            onAddToCart={handleAddToCart}
          />
        );
      case 'Panier':
        return (
          <CartList
            items={cartItems}
            onRemoveItem={handleRemoveItem}
            onUpdateQuantity={handleUpdateQuantity}
            onCheckout={handleCheckout}
          />
        );
      case 'Compte':
        return (
          <View style={styles.placeholderContent}>
            <AccountDropdown 
              visible={showAccountDropdown} 
              onClose={() => setShowAccountDropdown(false)}
            />
          </View>
        );
      case 'Factures':
        return (
          <View style={styles.placeholderContent}>
            <BillView />
          </View>
        );
      case 'Achats':
        return (
          <View style={styles.placeholderContent}>
            <Text style={styles.placeholderText}>Mes Achats</Text>
            <Text>Suivez vos achats d'électricité verte</Text>
          </View>
        );
      case 'Compteurs':
        return (
          <View style={styles.placeholderContent}>
            <MeterView 
              onClose={() => {
                setActiveTab('Compte');
                setShowAccountDropdown(true);
              }}
              onBack={() => {
                setActiveTab('Compte');
                setShowAccountDropdown(true);
              }}
            />
          </View>
        );
      default:
        return null;
    }
  };

  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.container}>
          {showRegister ? (
            <RegisterView 
              onRegister={() => {
                setIsLoggedIn(true);
                setShowRegister(false);
              }}
              onNavigateToLogin={() => setShowRegister(false)}
            />
          ) : (
            <LoginView 
              onLogin={() => setIsLoggedIn(true)} 
              onNavigateToRegister={() => setShowRegister(true)}
            />
          )}
        </ThemedView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Sowatt</Text>
          </View>
           <LoginButton 
            isLoggedIn={isLoggedIn}
            onPress={() => {
              setIsLoggedIn(false);
              router.replace('/(tabs)');
            }} 
          />
          
        </View>
        
        <View style={styles.content}>
          {renderContent()}
        </View>
        
        <BottomNavBar 
          activeTab={activeTab}
          onTabPress={(tab) => {
            setActiveTab(tab);
            if (tab === 'Compte') {
              setShowAccountDropdown(true);
            } else {
              setShowAccountDropdown(false);
            }
          }}
          cartItemsCount={cartItems.length}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E8F5E9',
  },
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#00A19B',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
    backgroundColor: '#E8F5E9',
  },
  cartBadge: {
    position: 'absolute',
    top: 10,
    right: 16,
    backgroundColor: '#FF5252',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  placeholderContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#E8F5E9',
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#00A19B',
  },
});
