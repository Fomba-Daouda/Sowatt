import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import { Sowatt } from './SowattCard';
import { PaymentView } from './PaymentView';

interface CartItem {
  sowatt: Sowatt;
  quantity: number;
}

interface CartListProps {
  items: CartItem[];
  onRemoveItem: (sowatt: Sowatt) => void;
  onUpdateQuantity: (sowatt: Sowatt, quantity: number) => void;
  onCheckout: () => void;
}

export const CartList: React.FC<CartListProps> = ({
  items,
  onRemoveItem,
  onUpdateQuantity,
  onCheckout,
}) => {
  const [showPayment, setShowPayment] = useState(false);

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      return total + (item.sowatt.price * item.quantity);
    }, 0);
  };

  if (showPayment) {
    return (
      <PaymentView
        totalAmount={calculateTotal()}
        onPaymentSuccess={() => {
          onCheckout();
          setShowPayment(false);
        }}
        onPaymentCancel={() => setShowPayment(false)}
      />
    );
  }

  const renderItem = ({ item }: { item: CartItem }) => (
    <ThemedView style={styles.cartItem}>
      <View style={styles.itemHeader}>
        <ThemedText style={styles.itemType}>{item.sowatt.type}</ThemedText>
        <TouchableOpacity
          onPress={() => onRemoveItem(item.sowatt)}
          style={styles.removeButton}
        >
          <Text style={styles.removeButtonText}>×</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.itemDetails}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => onUpdateQuantity(item.sowatt, Math.max(1, item.quantity - 1))}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <ThemedText style={styles.quantity}>{item.quantity} kWh</ThemedText>
          <TouchableOpacity
            onPress={() => onUpdateQuantity(item.sowatt, item.quantity + 1)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <ThemedText style={styles.itemPrice}>
          {(item.sowatt.price * item.quantity).toFixed(2)}€
        </ThemedText>
      </View>
    </ThemedView>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.sowatt.type}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <ThemedText style={styles.totalLabel}>Total:</ThemedText>
          <ThemedText style={styles.totalPrice}>
            {calculateTotal().toFixed(2)}€
          </ThemedText>
        </View>

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => setShowPayment(true)}
        >
          <Text style={styles.checkoutButtonText}>Passer la commande</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  listContent: {
    padding: 6,
    paddingBottom: 100,
  },
  cartItem: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemType: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  removeButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF5252',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 14,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 8,
    zIndex: 2,
    height: 140,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  checkoutButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 