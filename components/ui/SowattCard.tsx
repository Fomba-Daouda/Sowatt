import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import { SowattDetail } from './SowattDetail';
import { AddToCartModal } from './AddToCartModal';

export interface Sowatt {
  type: string;
  description: string;
  price: number;
  location: string;
  sellerName: string;
  isAvailable: boolean;
  imageUrl: string;
}

interface CartItem {
  sowatt: Sowatt;
  quantity: number;
}

interface SowattCardProps {
  sowatt: Sowatt;
  onBackToList?: () => void;
  onAddToCart?: (sowatt: Sowatt, quantity: number) => void;
}

export const SowattCard: React.FC<SowattCardProps> = ({ 
  sowatt, 
  onBackToList,
  onAddToCart 
}) => {
  const [showDetail, setShowDetail] = useState(false);
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);

  const handleOrder = () => {
    // Logique pour commander
    console.log('Commander:', sowatt);
  };

  const handleAddToCart = (quantity: number) => {
    onAddToCart?.(sowatt, quantity);
    setShowAddToCartModal(false);
  };

  const handleBackToList = () => {
    setShowDetail(false);
    onBackToList?.();
  };

  return (
    <>
      <ThemedView style={styles.container}>
        <Image 
          source={{ uri: sowatt.imageUrl }} 
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.content}>
          <View style={styles.header}>
            <ThemedText style={styles.type}>{sowatt.type}</ThemedText>
            <ThemedText style={styles.price}>{sowatt.price}€</ThemedText>
          </View>
          
          <ThemedText style={styles.description}>{sowatt.description}</ThemedText>
          
          <View style={styles.details}>
            <ThemedText style={styles.detailText}>
              Vendeur: {sowatt.sellerName}
            </ThemedText>
            <ThemedText style={styles.detailText}>
              Localisation: {sowatt.location}
            </ThemedText>
          </View>
          
          <TouchableOpacity 
            onPress={() => setShowDetail(true)}
            style={[
              styles.availability,
              { backgroundColor: sowatt.isAvailable ? '#4CAF50' : '#F44336' }
            ]}
          >
            <Text style={styles.availabilityText}>
              {sowatt.isAvailable ? 'Disponible' : 'Non disponible'}
            </Text>
          </TouchableOpacity>
        </View>
      </ThemedView>

      {showDetail && (
        <SowattDetail
          sowatt={sowatt}
          onClose={() => setShowDetail(false)}
          onOrder={handleOrder}
          onAddToCart={() => setShowAddToCartModal(true)}
          onBackToList={handleBackToList}
        />
      )}

      <AddToCartModal
        sowatt={sowatt}
        isVisible={showAddToCartModal}
        onClose={() => setShowAddToCartModal(false)}
        onAddToCart={handleAddToCart}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    marginVertical: 4,
    marginHorizontal: 6,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  type: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  description: {
    fontSize: 11,
    marginBottom: 4,
  },
  details: {
    marginBottom: 2,
  },
  detailText: {
    fontSize: 11,
    marginBottom: 1,
  },
  availability: {
    height: 26,
    padding: 4,
    borderRadius: 3,
    alignItems: 'center',
  },
  availabilityText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 11,
  },
}); 